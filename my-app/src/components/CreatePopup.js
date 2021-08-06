import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom'
import axios from "axios";

const Hook = (props) => {
  return (<Row>
    <Col md = {3}>
      <Form.Label>Product</Form.Label>
      <Form.Select class="form-control" id="hooks-select" defaultValue={props.selectedProduct != null ? props.selectedProduct.hooks[props.id] : ''}>
        {props.productNames.map(product => <option>{product}</option>)}
      </Form.Select>
    </Col>
    <Col md = {3}>
      <Form.Label>Loss per Order</Form.Label>
      <Form.Control type="number" placeholder="Enter Number" id="losses-select" defaultValue={props.selectedProduct != null ? props.selectedProduct.losses[props.id] : ''}/>
    </Col>
  </Row>)
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
      this.resetPopup()
  }

  createTracker() {
    var newTracker = {}
    var fieldNames = ["name", "qty", 'link']
    var fieldValues = document.querySelectorAll('.popup-form')

    for (var i = 0; i < fieldNames.length; i++) {
      newTracker[fieldNames[i]] = fieldValues[i].value
    }

    newTracker.hooks = Array.from(document.querySelectorAll('#hooks-select')).map(hook => hook.value)
    newTracker.losses = Array.from(document.querySelectorAll('#losses-select')).map(loss => loss.value)

    //temporary
    newTracker.lastUpdated = '08/02/2021'
    newTracker.date = '08/02/2021'

    if (this.props.selectedProduct == null) {
      axios.post("http://localhost:5000/trackers/addTracker", newTracker)
        .then(res => newTracker._id = res.data)
      this.props.add(newTracker)
    }
    else {
      newTracker._id = this.props.selectedProduct._id

      axios.post("http://localhost:5000/trackers/updateTracker/" + this.props.selectedProduct._id, newTracker)
        .then(res => console.log(res))
      this.props.updateProduct(newTracker)
    }

    this.hidePopup()
  }

  addHook() {
    this.setState({
      hooks: this.state.hooks + 1
    })
  }

  renderHooks() {
    var hookList = []

    for (var i = 0; i < this.state.hooks; i++) {
      hookList.push(<Hook id = {i} key = {i} productNames = {this.props.productNames} selectedProduct={this.props.selectedProduct}/>)
    }

    return hookList
  }

  render() {
    return (
      <div class = "popup-wrapper">
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
    if (nextProps.selectedProduct != null) {
      console.log(nextProps.selectedProduct)
      this.setState({
        hooks: nextProps.selectedProduct.hooks.length
      })
    }
  }
}
