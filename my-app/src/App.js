import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ProductDisplay from './components/ProductDisplay.js'
import NavbarHead from './components/NavbarHead.js'
import CreatePopup from './components/CreatePopup.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import React from "react";

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      productList: [],
      productNames: [],
      productIds: [],
      selectedProduct: null,
      loaded: false
    }

    this.renderProducts = this.renderProducts.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.editProduct = this.editProduct.bind(this)
    this.loadPopup = this.loadPopup.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
  }

  renderProducts() {
    var products = []
    for (var i = 0; i < this.state.productList.length; i++) {
      var product = <ProductDisplay id = {i} key={i} img={this.state.productList[i].imgSrc} name = {this.state.productList[i].name} qty = {this.state.productList[i].qty} date = {this.state.productList[i].buyDate} delete = {this.deleteProduct} edit = {this.editProduct}/>
      products.push(product)
    }

    const noRows = Math.ceil(this.state.productList.length / 4);

    return Array.from(Array(noRows)).map((n, i) => (
      <Row className = "product-row">
       {products.slice(i* 4, (i + 1)* 4)}
      </Row>
    ));
  }

  addProduct(product) {
    this.setState({
       productList: this.state.productList.concat([product])
    })
  }

  updateProduct(product) {
    var index = this.state.productList.findIndex(item => item._id === product._id)
    var copy = [...this.state.productList]

    copy[index] = product
    console.log(copy, index, product)
    this.setState({
      productList: copy
    })
  }

  deleteProduct(index) {
    axios.delete("http://localhost:5000/trackers/deleteTracker/" + this.state.productList[index]._id)
      .then(response => {
          console.log(response)
      });

    this.setState({
      productList: this.state.productList.filter((_, i) => i !== index)
    })
  }

  editProduct(index) {
    this.setState({
      selectedProduct: this.state.productList[index]
    })

    document.querySelector('.popup-wrapper').style.display = "initial"
  }

  loadPopup() {
    this.setState({
      selectedProduct: null
    })

    document.querySelector('.popup-wrapper').style.display = "initial"
  }

  render() {
    return (
      <div>
        <NavbarHead loadPopup = {this.loadPopup} loaded = {this.state.loaded}/>
        <CreatePopup add = {this.addProduct} productNames = {this.state.productNames} productIds = {this.state.productIds} selectedProduct = {this.state.selectedProduct} updateProduct = {this.updateProduct}/>

        <Container>
          <img src = "https://upload.wikimedia.org/wikipedia/commons/7/7d/Pedro_luis_romani_ruiz.gif" class = "loading"></img>
          {this.renderProducts()}
        </Container>
      </div>
    );
  }

  componentDidMount() {
    axios.get("http://localhost:5000/hooks/getProducts")
      .then(response => {
          this.setState({
            productNames: response.data.map(product => product.title),
            productIds: response.data.map(product => product.listing_id)
          })

          console.log(this.state.productIds)
      });

    axios.get("http://localhost:5000/trackers/getTrackers")
      .then(response => {
        document.querySelector(".loading").style.display = "none"
        this.setState({
          productList: response.data,
          loaded: true
        })
      })
  }
}

export default App;
