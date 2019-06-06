import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledForm = styled.form`
  max-width: 35rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 2.5rem auto 0;

  input {
    border-radius: 0.25rem;
  }

  input[type="reset"] {
    background-color: #eee;
    border: none;
    color: ${props => props.theme.brand};
    padding: 1rem 2rem;
    margin: 0.5rem;
  }
  input[type="submit"] {
    background-color: ${props => props.theme.brand};
    border: none;
    color: white;
    padding: 1rem 2rem;
    margin: 0.5rem;
  }
`;

const StyledUpdateHomeForm = styled.div`
  margin-top: 2rem;
  padding: 0 2rem;
`;

export default class UpdateHomeForm extends Component {
  state = {
    currentAddress: "",
    currentCity: "",
    currentZip: "",
    currentCode: "",
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
      .then(req => {
        return this.setState({
          currentAddress: req.data.data.address,
          currentCity: req.data.data.city,
          currentZip: req.data.data.zip,
          currentCode: req.data.data.code
        });
      })
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
      <StyledUpdateHomeForm>
        <h2>
          Update Home: {this.state.currentAddress},{this.state.currentCity},
          {this.state.currentZip},{this.state.currrentCode}
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
      </StyledUpdateHomeForm>
    );
  }
}
