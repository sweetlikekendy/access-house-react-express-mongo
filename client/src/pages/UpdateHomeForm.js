import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledForm = styled.form`
  max-width: 600px;
  background-color: #eee;
  display: grid;
  grid-template-columns: 1fr 1fr;

  input {
    border-radius: 0.25rem;
  }

  input[type="reset"] {
    background-color: #ccc;
    border: none;
    color: #4caf50;
    padding: 1rem 2rem;
    margin: 0.5rem;
  }
  input[type="submit"] {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 1rem 2rem;
    margin: 0.5rem;
  }
`;

export default class UpdateHomeForm extends Component {
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

  // Get a single home using the id from the params
  getHome = () => {
    axios
      .get(`http://localhost:5000/homes/${this.props.match.params.id}`)
      .then(req =>
        this.setState({
          address: req.data.data.address,
          city: req.data.data.city,
          zip: req.data.data.zip,
          code: req.data.data.code
        })
      )
      .catch(err => console.log(err));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { address, city, zip, code } = this.state;

    axios
      .patch(`http://localhost:5000/homes/${this.props.match.params.id}/edit`, {
        address,
        city,
        zip,
        code
      })
      .then(res => {
        if (res.data.redirect === "/homes") {
          window.location = "/homes";
        }
      })
      .catch(err => console.log(err));

    this.clearHome();
  };

  componentDidMount() {
    this.getHome();
  }

  render() {
    return (
      <>
        <h2>
          Update Home: {this.state.address}, {this.state.city}, {this.state.zip}
          , {this.state.code}
        </h2>
        <StyledForm method="POST" onSubmit={this.handleSubmit}>
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
            type="reset"
            name="clearHome"
            value="Clear"
            onClick={this.clearHome}
          />
        </StyledForm>
      </>
    );
  }
}
