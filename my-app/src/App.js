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
import pla from './images/pla.jpg'
import axios from "axios";
import React from "react";

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      productList: [{"img": pla, "name": "Black Filament", "qty": "3", "date": "08/21/2021"}, {"img": pla, "name": "White Filament", "qty": "3", "date": "08/21/2021"}, {"img": pla, "name": "Red Filament", "qty": "3", "date": "08/21/2021"}, {"img": pla, "name": "Black Filament", "qty": "3", "date": "08/21/2021"}, {"img": pla, "name": "Black Filament", "qty": "3", "date": "08/21/2021"}],
      productNames: []
    }

    this.renderProducts = this.renderProducts.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  renderProducts() {
    var products = []
    for (var i = 0; i < this.state.productList.length; i++) {
      var product = <ProductDisplay id = {i} key={i} img={pla} name = {this.state.productList[i].name} qty = {this.state.productList[i].qty} date = {this.state.productList[i].date} delete = {this.deleteProduct} />
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
       productList: this.state.productList.concat([{"img": pla, "name": product.name, "qty": product.qty, "date": product.date}])
    })
  }

  deleteProduct(index) {
    this.setState({
      productList: this.state.productList.filter((_, i) => i !== index)
    })
  }

  render() {
    return (
      <div>
        <NavbarHead/>
        <CreatePopup add = {this.addProduct} productNames = {this.state.productNames}/>

        <Container>
          {this.renderProducts()}
        </Container>
      </div>
    );
  }

  componentDidMount() {
    axios.get("http://localhost:5000/hooks/getProducts")
      .then(response => {
          this.setState({
            productNames: response.data.map(product => product.title)
          })
      });
  }
}

export default App;
