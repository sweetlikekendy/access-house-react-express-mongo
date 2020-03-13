import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Input } from "../styles";
import theme from "../styles/theme";

const { formTextColor, bg } = theme;

const FieldSet = styled.fieldset`
  border: none;
`;

const StyledForm = styled.form`
  max-width: 35rem;
  display: flex;
  flex-wrap: wrap;
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "address address"
    "city state"
    "zip gate"
    "buttons buttons";
  grid-gap: 0.5rem; */
  margin: 2.5rem auto 0;

  input[type="submit"] {
    border: none;
    cursor: pointer;
    padding: 1rem 2rem;
    margin: 0.5rem;
  }

  input[type="reset"] {
    background-color: #eee;
    color: ${props => props.theme.brand};
  }
  input[type="submit"] {
    background-color: ${props => props.theme.brand};
    color: white;
  }
  .input-container {
    margin: 0 1rem 1rem;
  }
  #address {
    /* grid-area: address; */
    flex-basis: 100%;
  }
  #city,
  #state,
  #zip,
  #gate {
    flex-basis: 40%;
    /* grid-area: city; */
  }

  #city,
  #zip {
    margin-right: 1rem;
  }
  #state,
  #gate {
    /* margin-right: -1rem; */
  }
  #state {
    /* grid-area: state; */
  }
  #zip {
    /* grid-area: zip; */
  }
  #gate {
    /* grid-area: gate; */
  }
  #address-input {
  }
  #city-input {
  }
  #zip-input {
  }
  #gate-input {
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    input[type="reset"],
    input[type="submit"] {
      max-width: 100%;
      margin: 0.5rem 0;
    }

    grid-template-areas:
      "address"
      "city"
      "state"
      "zip"
      "gate"
      "buttons";
  }
`;

const StyledAddHomeForm = styled.div`
  max-width: ${props => props.theme.pageWidth};
  margin: 2rem auto;
  padding: 0 2rem;
`;

const ButtonGroup = styled.div`
  grid-area: buttons;
  display: flex;
  flex-direction: row-reverse;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const InputContainer = styled.div`
  position: relative;
  font-size: 18px;
  label {
    padding: 0 0.25rem;
    outline: none;
    background-color: #fff;
    font-size: 16px;
    color: ${formTextColor};
    position: absolute;
    left: 1em;
    top: 0.9em;
    pointer-events: none;
    transition: ease-in-out, top 0.2s ease-in-out;
  }
  label:after {
    content: "*";
    color: #e32b2b;
    margin-left: 4px;
  }

  input:active {
    /* & + label {
      top: -0.75em;
    } */
  }

  input:focus {
    border-bottom: 2px solid black;
  }
  .focused {
    top: -0.75em;
  }
`;

export default class AddHomeForm extends Component {
  state = {
    address: "",
    city: "",
    zip: "",
    gate: ""
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  inputFieldFocusIn = e => {
    // console.log(e.target);
    // get the corresponding input field
    const inputName = e.target.name;
    // get the corresponding label
    const sibling = document.getElementById(`${inputName}-label`);

    console.log(inputName);
    // 2. if the input field clicked on
    if (e.target === document.activeElement) {
      sibling.classList.add("focused");
    }
  };
  inputFieldFocusOut = e => {
    // console.log(e.target);
    // get the corresponding input field
    const inputName = e.target.name;
    // get the corresponding label
    const sibling = document.getElementById(`${inputName}-label`);

    if (!e.target.value) {
      sibling.classList.remove("focused");
    }
  };

  componentDidMount() {
    const delegate = selector => cb => e => e.target.matches(selector) && cb(e);

    const inputTextDelegate = delegate("input[type=text]");
    const inputTelDelegate = delegate("input[type=tel]");

    // Text event listeners
    window.addEventListener(
      "focusin",
      inputTextDelegate(el => this.inputFieldFocusIn(el))
    );

    window.addEventListener(
      "focusout",
      inputTextDelegate(el => this.inputFieldFocusOut(el))
    );
    // Tel event listeners
    window.addEventListener(
      "focusin",
      inputTelDelegate(el => this.inputFieldFocusIn(el))
    );

    window.addEventListener(
      "focusout",
      inputTelDelegate(el => this.inputFieldFocusOut(el))
    );
  }

  handleSubmit = e => {
    const { address, city, zip, code } = this.state;
    const BACKEND_API_URL =
      process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api/homes"
        : "https://protected-oasis-33800.herokuapp.com/api/homes";

    e.preventDefault();

    axios
      .post(`${BACKEND_API_URL}`, {
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
        <FieldSet>
          <StyledForm method="POST" onSubmit={this.handleSubmit}>
            <InputContainer className="input-container" id="address">
              <Input
                id="address-input"
                width="100%"
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
                required
              />
              <label id="address-label">Address</label>
            </InputContainer>
            <InputContainer className="input-container" id="city">
              <Input
                id="city-input"
                width="100%"
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleInputChange}
                required
              />
              <label id="city-label">City</label>
            </InputContainer>
            <InputContainer className="input-container" id="state">
              <Input
                id="state-input"
                width="100%"
                type="text"
                name="state"
                value={this.state.city}
                onChange={this.handleInputChange}
                required
              />
              <label id="state-label">State</label>
            </InputContainer>
            <InputContainer className="input-container" id="zip">
              <Input
                id="zip-input"
                width="100%"
                type="tel"
                name="zip"
                value={this.state.zip}
                onChange={this.handleInputChange}
                required
              />
              <label id="zip-label">Zip code</label>
            </InputContainer>
            <InputContainer className="input-container" id="gate">
              <Input
                id="gate-input"
                width="100%"
                type="tel"
                name="gate"
                value={this.state.code}
                onChange={this.handleInputChange}
                required
              />
              <label id="gate-label">Gate code</label>
            </InputContainer>
            <ButtonGroup>
              <input type="submit" value="SUBMIT" />
            </ButtonGroup>
          </StyledForm>
        </FieldSet>
      </StyledAddHomeForm>
    );
  }
}
