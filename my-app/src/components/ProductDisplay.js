import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
export default class ProductDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <Col md = {3}>
        <div class = "product-display">
          <img src = {this.props.img}/>
          <h3 class = "text-center">{this.props.name}</h3>
          <p>Qty: {this.props.qty}</p>
          <p>Buy by: {this.props.qty}</p>
        </div>
      </Col>
    )
  }
}
