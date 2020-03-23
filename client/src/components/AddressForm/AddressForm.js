import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import InputContainer from "./InputContainer";
import { RightAlignButton } from "../../styles";

const FieldSet = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
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
    "zip code"
    "fake button";
  grid-gap: 1rem;
  margin: 0 auto;

  input[type="submit"] {
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
  #code {
    grid-area: code;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "address"
      "city"
      "state"
      "zip"
      "code"
      "button";

    input[type="submit"] {
      width: 100%;
      margin: 0;
    }
  }
`;

export default class AddressForm extends Component {
  state = {
    address: "",
    city: "",
    state: "",
    zip: "",
    code: "",
    addressActive: false,
    cityActive: false,
    stateActive: false,
    zipActive: false,
    codeActive: false,
    addressEmpty: false,
    cityEmpty: false,
    stateEmpty: false,
    zipEmpty: false,
    codeEmpty: false,
    // Load state. If the load state is 0, that means it hasn't been in focus
    // or value hasn't been changed
    addressLoad: 0,
    cityLoad: 0,
    stateLoad: 0,
    zipLoad: 0,
    codeLoad: 0
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
        case "code":
          return {
            codeLoad: prevState.codeLoad + 1
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

  clearHome = () => {
    this.setState({
      address: "",
      city: "",
      state: "",
      zip: "",
      code: "",
      addressActive: false,
      cityActive: false,
      stateActive: false,
      zipActive: false,
      codeActive: false,
      addressEmpty: false,
      cityEmpty: false,
      stateEmpty: false,
      zipEmpty: false,
      codeEmpty: false,
      addressLoad: 0,
      cityLoad: 0,
      stateLoad: 0,
      zipLoad: 0,
      codeLoad: 0
    });
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

  async componentDidMount() {
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
    const { address, city, state, zip, code } = this.state;

    const lowerCaseHttpReq = this.props.httpreq.toLowerCase();

    e.preventDefault();

    console.log(this.props.uri);
    if (lowerCaseHttpReq === "post") {
      axios
        .post(`${this.props.uri}`, {
          address,
          city,
          state,
          zip,
          code
        })
        .then(res => {
          if (res.status === 201) {
            window.location = "/homes";
            return false;
          }
        })
        .catch(err => console.log(err));
    }
    if (lowerCaseHttpReq === "patch") {
      axios
        .patch(`${this.props.uri}`, {
          address,
          city,
          state,
          zip,
          code
        })
        .then(res => {
          if (res.status === 200) {
            window.location = "/homes";
            return false;
          }
        })
        .catch(err => console.log(err));
    }

    this.clearHome();
  };

  render() {
    return (
      <FieldSet>
        <StyledForm method="POST" onSubmit={this.handleSubmit}>
          <InputContainer
            className="input-container"
            id="address"
            type="input"
            name="address"
            loadCount={this.state.addressLoad}
            isEmpty={this.state.addressEmpty}
            isActive={this.state.addressActive}
            stateOfInput={this.state.address}
            dataMissingError="Please enter an address name"
            dataParseError="Invalid value"
            handleInputChange={this.handleInputChange}
          />
          <InputContainer
            className="input-container"
            id="city"
            type="input"
            name="city"
            loadCount={this.state.cityLoad}
            isEmpty={this.state.cityEmpty}
            isActive={this.state.cityActive}
            stateOfInput={this.state.city}
            dataMissingError="Please enter a city name"
            dataParseError="Invalid value"
            handleInputChange={this.handleInputChange}
          />
          <InputContainer
            className="input-container"
            id="state"
            type="select"
            name="state"
            loadCount={this.state.stateLoad}
            isEmpty={this.state.stateEmpty}
            isActive={this.state.stateActive}
            stateOfInput={this.state.state}
            dataMissingError="Please enter a state"
            dataParseError="Invalid value"
            handleInputChange={this.handleInputChange}
          />
          <InputContainer
            className="input-container"
            id="zip"
            type="input"
            name="zip"
            loadCount={this.state.zipLoad}
            isEmpty={this.state.zipEmpty}
            isActive={this.state.zipActive}
            stateOfInput={this.state.zip}
            dataMissingError="Please enter a zip code"
            dataParseError="Invalid value"
            handleInputChange={this.handleInputChange}
          />
          <InputContainer
            className="input-container"
            id="code"
            type="input"
            name="code"
            loadCount={this.state.codeLoad}
            isEmpty={this.state.codeEmpty}
            isActive={this.state.codeActive}
            stateOfInput={this.state.code}
            dataMissingError="Please enter a gate code"
            dataParseError="Invalid value"
            handleInputChange={this.handleInputChange}
          />
          <RightAlignButton>
            <input
              className="call-to-action-button"
              type="submit"
              value="SUBMIT"
            />
          </RightAlignButton>
        </StyledForm>
      </FieldSet>
    );
  }
}
