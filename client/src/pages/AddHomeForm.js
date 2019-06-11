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

  input[type="reset"],
  input[type="submit"] {
    border: none;
    cursor: pointer;
    padding: 1rem 2rem;
    margin: 0.5rem;
    max-width: 40%;
  }

  input[type="reset"] {
    background-color: #eee;
    color: ${props => props.theme.brand};
  }
  input[type="submit"] {
    background-color: ${props => props.theme.brand};
    color: white;
  }

  @media only screen and (max-width: 600px) {
    input[type="reset"],
    input[type="submit"] {
      max-width: 70%;
    }
  }
`;

const StyledAddHomeForm = styled.div`
  margin-top: 2rem;
  padding: 0 2rem;
`;

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
      .post("https://protected-oasis-33800.herokuapp.com/api/homes", {
        address,
        city,
        zip,
        code
      })
      .then(res => {
        console.log(res.data);
        if (res.data.redirect === "/homes") {
          window.location = "/homes";
        }
      })
      .catch(err => console.log(err));

    this.clearHome();
  };

  render() {
    return (
      <StyledAddHomeForm>
        <h2>Add a New Home</h2>
        <StyledForm method="POST" onSubmit={this.handleSubmit}>
          <label>Address </label>
          <input
            type="text"
            name="address"
            placeholder="address"
            value={this.state.address}
            onChange={this.handleInputChange}
            required
          />
          <label>City </label>
          <input
            type="text"
            name="city"
            placeholder="city"
            value={this.state.city}
            onChange={this.handleInputChange}
            required
          />
          <label>Zip code </label>
          <input
            type="text"
            name="zip"
            placeholder="zip code"
            value={this.state.zip}
            onChange={this.handleInputChange}
            required
          />
          <label>Gate code </label>
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
      </StyledAddHomeForm>
    );
  }
}
