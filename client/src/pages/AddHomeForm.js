import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Input, Select } from "../styles";
import theme from "../styles/theme";

const { formTextColor, letterSpacing } = theme;

const FieldSet = styled.fieldset`
  border: none;
`;

const StyledForm = styled.form`
  max-width: 35rem;
  display: flex;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "address address"
    "city state"
    "zip gate"
    "fake button";
  grid-gap: 1rem;
  margin: 2.5rem auto 0;

  input[type="submit"] {
    width: 200px;
    border: none;
    cursor: pointer;
    padding: 1rem 1.5rem;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
    background-color: ${props => props.theme.brand};
    color: white;
    grid-area: button;
  }

  #address {
    grid-area: address;
  }
  #city {
    grid-area: city;
  }
  #state {
    grid-area: state;
  }
  #zip {
    grid-area: zip;
  }
  #gate {
    grid-area: gate;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;

    input[type="submit"] {
      width: 100%;
      margin: 0;
    }

    grid-template-areas:
      "address"
      "city"
      "state"
      "zip"
      "gate"
      "button";
  }
`;

const StyledAddHomeForm = styled.div`
  max-width: ${props => props.theme.pageWidth};
  margin: 2rem auto;
  padding: 0 2rem;
`;

const InputContainer = styled.div`
  position: relative;
  font-size: 18px;
  label {
    padding: 0 0.25rem;
    outline: none;
    background-color: #fff;
    font-size: 16px;
    letter-spacing: ${letterSpacing};
    color: ${formTextColor};
    position: absolute;
    left: 1em;
    top: 1em;
    pointer-events: none;
    transition: ease-in-out, top 0.2s ease-in-out;
  }
  label:after {
    content: "*";
    color: #e32b2b;
    margin-left: 4px;
  }

  input:focus,
  select:focus {
    border-bottom: 2px solid gray;
  }
  .focused {
    top: -0.75em;
  }
  .bad-input {
    border-bottom: 2px solid #e32b2b;
  }
  .good-input {
    border-bottom: 2px solid green;
  }
`;

const ButtonContainer = styled.div`
  grid-area: button;
  display: flex;
  justify-content: flex-end;
`;

export default class AddHomeForm extends Component {
  state = {
    address: "",
    city: "",
    state: "",
    zip: "",
    gate: "",
    addressActive: false,
    cityActive: false,
    stateActive: false,
    zipActive: false,
    gateActive: false,
    addressEmpty: false,
    cityEmpty: false,
    stateEmpty: false,
    zipEmpty: false,
    gateEmpty: false,
    // Load state. If the load state is 0, that means it hasn't been in focus
    // or value hasn't been changed
    addressLoad: 0,
    cityLoad: 0,
    stateLoad: 0,
    zipLoad: 0,
    gateLoad: 0
  };

  // Method to set corresponding load state
  setLoadState = name => {
    this.setState(prevState => {
      switch (name) {
        case "address":
          return {
            addressLoad: prevState.addressLoad + 1
          };
        case "city":
          return {
            cityLoad: prevState.cityLoad + 1
          };
        case "state":
          return {
            stateLoad: prevState.stateLoad + 1
          };
        case "zip":
          return {
            zipLoad: prevState.zipLoad + 1
          };
        case "gate":
          return {
            gateLoad: prevState.gateLoad + 1
          };
        default:
          console.log(`Nothing with that load`);
          break;
      }
    });
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
      [`${name}Active`]: true,
      [`${name}Empty`]: false
    });

    this.setLoadState(name);
  };

  inputFieldFocusIn = e => {
    // get the corresponding input field
    const { name } = e.target;

    // 2. if the input field clicked on, set active to true
    if (e.target === document.activeElement) {
      this.setState({
        [`${name}Active`]: true
      });
    }
  };

  inputFieldFocusOut = ({ target: { name, value } }) => {
    // if input field is empty, set active to false, and empty to true
    if (!value) {
      this.setState({
        [`${name}Active`]: false,
        [`${name}Empty`]: true
      });
    }

    this.setLoadState(name);
  };

  delegate = selector => cb => e => e.target.matches(selector) && cb(e);

  componentDidMount() {
    const inputTextDelegate = this.delegate("input[type=text]");
    const inputTelDelegate = this.delegate("input[type=tel]");
    const inputSelectDelegate = this.delegate("select");

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
    // Select event listeners
    window.addEventListener(
      "focusin",
      inputSelectDelegate(el => this.inputFieldFocusIn(el))
    );

    window.addEventListener(
      "focusout",
      inputSelectDelegate(el => this.inputFieldFocusOut(el))
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
                // If the state is empty and the input field has not been changed or visited once,
                // display bad input
                className={
                  this.state.addressEmpty
                    ? "bad-input"
                    : this.state.addressLoad !== 0
                    ? "good-input"
                    : ""
                }
                width="100%"
                type="text"
                name="address"
                valueMaxlength="20"
                data-missing-error="Please enter an Address Name"
                data-parse-error="Invalid value"
                value={this.state.address}
                onChange={this.handleInputChange}
                required
              />
              <label
                id="address-label"
                className={this.state.addressActive ? "focused" : ""}
              >
                Address
              </label>
            </InputContainer>
            <InputContainer className="input-container" id="city">
              <Input
                className={
                  this.state.cityEmpty
                    ? "bad-input"
                    : this.state.cityLoad !== 0
                    ? "good-input"
                    : ""
                }
                id="city-input"
                width="100%"
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleInputChange}
                required
              />
              <label
                id="city-label"
                className={this.state.cityActive ? "focused" : ""}
              >
                City
              </label>
            </InputContainer>
            <InputContainer className="input-container" id="state">
              <Select
                id="state-input"
                className={
                  this.state.stateEmpty
                    ? "bad-input"
                    : this.state.stateLoad !== 0
                    ? "good-input"
                    : ""
                }
                name="state"
                data-missing-error="Please select a State"
                data-parse-error="Invalid value"
                data-range-error="Value too long or too short"
                required="required"
                value={this.state.state}
                onChange={this.handleInputChange}
              />
              <label
                id="state-label"
                className={this.state.stateActive ? "focused" : ""}
              >
                State
              </label>
            </InputContainer>
            <InputContainer className="input-container" id="zip">
              <Input
                id="zip-input"
                className={
                  this.state.zipEmpty
                    ? "bad-input"
                    : this.state.zipLoad !== 0
                    ? "good-input"
                    : ""
                }
                width="100%"
                type="tel"
                name="zip"
                value={this.state.zip}
                onChange={this.handleInputChange}
                required
              />
              <label
                id="zip-label"
                className={this.state.zipActive ? "focused" : ""}
              >
                Zip code
              </label>
            </InputContainer>
            <InputContainer className="input-container" id="gate">
              <Input
                id="gate-input"
                className={
                  this.state.gateEmpty
                    ? "bad-input"
                    : this.state.gateLoad !== 0
                    ? "good-input"
                    : ""
                }
                width="100%"
                type="tel"
                name="gate"
                value={this.state.gate}
                onChange={this.handleInputChange}
                required
              />
              <label
                id="gate-label"
                className={this.state.gateActive ? "focused" : ""}
              >
                Gate code
              </label>
            </InputContainer>

            <ButtonContainer>
              <input type="submit" value="SUBMIT" />
            </ButtonContainer>
          </StyledForm>
        </FieldSet>
      </StyledAddHomeForm>
    );
  }
}
