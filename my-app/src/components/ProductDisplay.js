import React from "react";
export default class ProductDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class = "product-display">
        <img src = {this.props.img}/>
        <h3 class = "text-center">{this.props.name}</h3>
        <p>Qty: {this.props.qty}</p>
        <p>Buy by: {this.props.qty}</p>
      </div>
    )
  }
}
