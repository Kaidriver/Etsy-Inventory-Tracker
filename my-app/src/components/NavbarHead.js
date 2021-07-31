import React from "react";
import Button from 'react-bootstrap/Button';
export default class NavbarHead extends React.Component {
  constructor(props) {
    super(props)

    this.loadPopup = this.loadPopup.bind(this)
  }

  loadPopup() {
    document.querySelector('.popup-wrapper').style.display = "initial"
  }

  render() {
    return (
      <div class = "nav">
        <h1>Inventory Tracking App</h1>
        <Button onClick={this.loadPopup} id = "tracker-btn" variant="outline-light">Add New Tracker</Button>{' '}
      </div>
    )
  }
}
