import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import HomeInfo from "../components/HomeInfo";
import { AddressForm } from "../components/AddressForm";
import { Container } from "../styles";

const StyledUpdateHomeForm = styled.div`
  max-width: ${props => props.theme.formWidth};
  margin: 2rem auto 0;
  padding: 0 2rem;
  h3 {
    text-align: center;
    margin: 2rem 0 1rem;
  }
  .border-top-bottom {
    border-top: 1px solid ${props => props.theme.formBorderColor};
    border-bottom: 1px solid ${props => props.theme.formBorderColor};
  }
`;

export default class UpdateHomeForm extends Component {
  state = {
    currentAddress: "",
    currentCity: "",
    currentState: "",
    currentZip: "",
    currentCode: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    code: "",
    BACKEND_API_URI_GET:
      process.env.NODE_ENV !== "production"
        ? `http://localhost:5000/api/homes/${this.props.match.params.id}`
        : `https://protected-oasis-33800.herokuapp.com/api/homes/${this.props.match.params.id}`,
    BACKEND_API_URI_EDIT:
      process.env.NODE_ENV !== "production"
        ? `http://localhost:5000/api/homes/${this.props.match.params.id}/edit`
        : `https://protected-oasis-33800.herokuapp.com/api/homes/${this.props.match.params.id}/edit`
  };

  clearHome = () => {
    this.setState({
      address: "",
      city: "",
      state: "",
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
      .get(`${this.state.BACKEND_API_URI_GET}`)
      .then(req => {
        return this.setState({
          currentAddress: req.data.data.address,
          currentCity: req.data.data.city,
          currentState: req.data.data.state,
          currentZip: req.data.data.zip,
          currentCode: req.data.data.code
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getHome();
  }

  render() {
    const {
      currentAddress,
      currentCity,
      currentState,
      currentZip,
      currentCode,
      BACKEND_API_URI_EDIT
    } = this.state;
    return (
      <StyledUpdateHomeForm>
        <Container>
          <h2>Update Home</h2>
          <h3>Current Address</h3>
          <HomeInfo
            className="border-top-bottom"
            address={currentAddress}
            city={currentCity}
            state={currentState}
            zip={currentZip}
            code={currentCode}
          />
        </Container>
        <h3>Update Address</h3>
        <Container>
          <AddressForm httpreq="patch" uri={BACKEND_API_URI_EDIT} />
        </Container>
      </StyledUpdateHomeForm>
    );
  }
}
