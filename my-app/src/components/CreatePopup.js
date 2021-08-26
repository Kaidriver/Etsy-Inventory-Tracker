import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom'
import axios from "axios";

class Hook extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentProperty: {},
      currentName: props.selectedProduct != null ? props.selectedProduct.hooks[props.id] : '',
      loaded: false
    }

    if (this.props.productIds[0] != null) {
      axios.get("http://localhost:5000/hooks/getProperties/" + (this.props.selectedProduct != null && this.props.selectedProduct.properties[this.props.id] != null ? this.props.productIds[this.props.productNames.indexOf(this.props.selectedProduct.hooks[this.props.id])] : this.props.productIds[0]))
        .then(response => {
          this.setState({
            currentProperty: response.data
          })
        })
    }

    this.displayProperties = this.displayProperties.bind(this)
    this.renderHooks = this.renderHooks.bind(this)
  }

  displayProperties(event) {
    this.setState({
      currentName: event.target.value
    })
    axios.get("http://localhost:5000/hooks/getProperties/" + this.props.productIds[event.target.selectedIndex])
      .then(response => {
        this.setState({
          currentProperty: response.data
        })
      })
  }

  renderHooks() {
    var hooks = []

    hooks.push(<Col md = {3}>
      <Form.Label>Product</Form.Label>
      <Form.Select onChange={this.displayProperties} className="form-control hooks-field" id="hooks-select" value={this.state.currentName}>
        {this.props.productNames.map(product => <option>{product}</option>)}
      </Form.Select>
    </Col>)

    var properties = this.state.currentProperty
    var keys = Object.keys(properties)

    for (var i = 0; i < keys.length; i++) {
      var selections = properties[keys[i]].map(property => <option>{property}</option>)
      selections.unshift(<option>{'Any'}</option>)

      if (this.props.selectedProduct != null && this.props.selectedProduct.properties[this.props.id] != null) {
        selections = selections.filter(option => option.props.children != this.props.selectedProduct.properties[this.props.id][keys[i]])
        selections.unshift(<option>{this.props.selectedProduct.properties[this.props.id][keys[i]]}</option>)
      }

      hooks.push(<Col md = {3}>
        <Form.Label id = "property-select">{keys[i]}</Form.Label>
        <Form.Select id = "property-select" className = "hooks-field">
          {selections}
        </Form.Select>
      </Col>)
    }

    hooks.push(<Col md = {3}>
      <Form.Label className = "end" id = "property-select">Loss per Order</Form.Label>
      <Form.Control id = "property-select" type="number" placeholder="Enter Number" className="losses-select hooks-field" defaultValue={this.props.selectedProduct != null ? this.props.selectedProduct.losses[this.props.id] : ''}/>
    </Col>)

    const noRows = Math.ceil(hooks.length / 4);

    return Array.from(Array(noRows)).map((n, i) => (
      <Row>
       {hooks.slice(i* 4, (i + 1)* 4)}
      </Row>
    ));
  }

  render() {
    return (
      <div>
        {this.renderHooks()}
      </div>
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.productNames.length == 0) {
      axios.get("http://localhost:5000/hooks/getProperties/" + (nextProps.selectedProduct != null && nextProps.selectedProduct.properties[nextProps.id] != null ? nextProps.productIds[nextProps.productNames.indexOf(nextProps.selectedProduct.hooks[nextProps.id])] : nextProps.productIds[0]))
        .then(response => {
          console.log(response.data)
          this.setState({
            currentProperty: response.data,
            currentName: nextProps.selectedProduct != null ? nextProps.selectedProduct.hooks[nextProps.id] : '',
            loaded: true
          })
        })
    }
  }
}

export default class CreatePopup extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      hooks: 1,
      edit: false
    }

    this.addHook = this.addHook.bind(this)
    this.hidePopup = this.hidePopup.bind(this)
    this.createTracker = this.createTracker.bind(this)
    this.resetPopup = this.resetPopup.bind(this)
    this.renderHooks = this.renderHooks.bind(this)
    this.validateFields = this.validateFields.bind(this)
  }

  resetPopup() {
    document.querySelectorAll('.pForm').forEach(form => {
      console.log(form)
      form.reset()
    })

    this.setState({
      hooks: 1
    })
  }

  hidePopup() {
      document.querySelector('.popup-wrapper').style.display = "none"
      document.querySelector("body").style.overflow = "visible";
      this.resetPopup()
  }

  async createTracker() {

    if (!this.validateFields()) {
      alert("Please fill out all fields")
    }
    else {
      document.querySelector('.loading-wrapper').style.display = "initial"

      var newTracker = {}
      var fieldNames = ["name", "qty", 'link']
      var fieldValues = document.querySelectorAll('.popup-form')

      for (var i = 0; i < fieldNames.length; i++) {
        newTracker[fieldNames[i]] = fieldValues[i].value
      }

      newTracker.hooks = Array.from(document.querySelectorAll('#hooks-select')).map(hook => hook.value)
      newTracker.losses = Array.from(document.querySelectorAll('.losses-select')).map(loss => loss.value)

      var properties = []
      var propertyList = document.querySelectorAll('#property-select')
      var property = {}
      for (var i = 0; i < propertyList.length; i += 2) {

        if (propertyList[i].classList.contains("end")) {

          properties.push(property)
          property = {}
        }
        else {
          property[propertyList[i].innerText] = propertyList[i + 1].value
        }
      }

      newTracker.properties = properties

      if (this.props.selectedProduct == null) {
        axios.post("http://localhost:5000/trackers/addTracker", newTracker)
          .then(res => {
            newTracker._id = res.data._id
            newTracker.imgSrc = res.data.src
            newTracker.buyDate = res.data.buyDate

            this.props.add(newTracker)

            document.querySelector('.loading-wrapper').style.display = "none"
            this.hidePopup()
          })
      }
      else {
        newTracker._id = this.props.selectedProduct._id
        newTracker.imgSrc = this.props.selectedProduct.imgSrc

        var result = await axios.post("http://localhost:5000/trackers/updateTracker/" + this.props.selectedProduct._id, newTracker)
        newTracker.buyDate = result.data.buyDate
        this.props.updateProduct(newTracker)

        document.querySelector('.loading-wrapper').style.display = "none"
        this.hidePopup()
      }
    }
  }

  addHook() {
    this.setState({
      hooks: this.state.hooks + 1
    })
  }

  renderHooks() {
    var hookList = []

    for (var i = 0; i < this.state.hooks; i++) {
      hookList.push(<Hook id = {i} key = {i} productNames = {this.props.productNames} productIds = {this.props.productIds} selectedProduct={this.props.selectedProduct} displayProperties={this.displayProperties}/>)
    }

    return hookList
  }

  validateFields() {

    var textFields = document.querySelectorAll(".popup-form")
    for (var i = 0; i < textFields.length; i++) {
      if (textFields[i].value == "") {
        return false
      }
    }

    var hookFields = document.querySelectorAll(".hooks-field")
    for (var i = 0; i < hookFields.length; i++) {
      if (hookFields[i].value == "") {
        return false
      }
    }
    return true
  }

  render() {
    return (
      <div class = "popup-wrapper">
        <div class = "loading-wrapper">
          <img src = "https://upload.wikimedia.org/wikipedia/commons/7/7d/Pedro_luis_romani_ruiz.gif" class = "popup-loading"></img>
        </div>
        <div class = "popup">
          <svg onClick={this.hidePopup} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
          <h1 class = "text-center">{this.props.selectedProduct != null ? 'Edit Tracker' : 'Create Tracker'}</h1>
          <Form className = "pForm">
            <Row>
              <Col md = {8}>
                <Form.Label>Name</Form.Label>
                <Form.Control className = "popup-form" type="text" defaultValue={this.props.selectedProduct != null ? this.props.selectedProduct.name : ''} placeholder="Enter name" />
              </Col>
              <Col md = {4}>
                <Form.Label>Starting Quantity</Form.Label>
                <Form.Control className = "popup-form" type="number" defaultValue={this.props.selectedProduct != null ? this.props.selectedProduct.qty : ''} placeholder="Enter Number" />
              </Col>
            </Row>
            <Form.Label>Amazon Link</Form.Label>
            <Form.Control className = "popup-form" type="text" defaultValue={this.props.selectedProduct != null ? this.props.selectedProduct.link : ''} placeholder="Enter Link" />
          </Form>

          <div class = "hooks-header">
            <h3>Hooks with Etsy</h3>
            <Button onClick = {this.addHook}>Add New Hook</Button>
          </div>
          <div class = "hooks">
            <form className = "pForm">
              {this.renderHooks()}
            </form>
          </div>

          <Button onClick = {this.createTracker} id = "create-tracker-btn">{this.props.selectedProduct != null ? 'Edit Tracker' : 'Create Tracker'}</Button>
        </div>
      </div>
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (document.querySelector('.popup-wrapper').style.display == "initial") {
      document.querySelector("body").style.overflow = "hidden";
    }

    if (nextProps.selectedProduct != null) {
      console.log(nextProps.selectedProduct)
      this.setState({
        hooks: nextProps.selectedProduct.hooks.length
      })
    }
  }
}
