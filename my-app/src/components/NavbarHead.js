import React from "react";
import Button from 'react-bootstrap/Button';
export default class NavbarHead extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class = "nav">
        <h1>Inventory Tracking App</h1>
        <Button onClick={this.props.loadPopup} id = "tracker-btn" variant="outline-light" disabled = {this.props.loaded ? "" : "true"}>Add New Tracker</Button>{' '}
      </div>
    )
  }
}
