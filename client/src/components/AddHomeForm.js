import React, { Component } from "react";
import axios from "axios";

export default class AddHomeForm extends Component {
  state = {
    address: "",
    city: "",
    zip: "",
    code: ""
  };

  clearHome = () => {
    this.setState({
      address: "",
      city: "",
      zip: "",
      code: ""
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { address, city, zip, code } = this.state;

    axios
      .post("http://localhost:5000/homes", {
        address,
        city,
        zip,
        code
      })
      .then(res => {
        if (res.data.redirect === "/") {
          window.location = "/";
        }
      })
      .catch(err => console.log(err));

    this.clearHome();
  };

  render() {
    return (
      <div>
        <h2>Add a New Home</h2>
        <form method="POST" onSubmit={this.handleSubmit}>
          <label>Address: </label>
          <input
            type="text"
            name="address"
            placeholder="address"
            value={this.state.address}
            onChange={this.handleInputChange}
            required
          />
          <label>City: </label>
          <input
            type="text"
            name="city"
            placeholder="city"
            value={this.state.city}
            onChange={this.handleInputChange}
            required
          />
          <label>Zip code: </label>
          <input
            type="text"
            name="zip"
            placeholder="zip code"
            value={this.state.zip}
            onChange={this.handleInputChange}
            required
          />
          <label>Gate code: </label>
          <input
            type="text"
            name="code"
            placeholder="gate code"
            value={this.state.code}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" value="Submit" />
          <input
            type="button"
            name="clearHome"
            value="Clear"
            onClick={this.clearHome}
          />
        </form>
      </div>
    );
  }
}
