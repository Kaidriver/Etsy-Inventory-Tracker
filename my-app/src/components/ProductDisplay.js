import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
export default class ProductDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.deleteHook = this.deleteHook.bind(this)
  }

  deleteHook() {
    this.props.delete(this.props.id)
  }

  render() {

    return (
      <Col md = {3}>
        <div class = "product-display">
          <svg onClick={this.deleteHook} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg>
          <img src = {this.props.img}/>
          <h3 class = "text-center">{this.props.name}</h3>
          <p>Qty: {this.props.qty}</p>
          <p>Buy by: {this.props.date}</p>
        </div>
      </Col>
    )
  }
}
