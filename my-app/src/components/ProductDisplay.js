import React from "react";
export default class ProductDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class = "product-display">
        <img src = {this.props.img}/>
        <h3>{this.props.name}</h3>
        <h3>Qty: {this.props.qty}</h3>
      </div>
    )
  }
}
