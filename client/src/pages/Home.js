import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const StyledHome = styled.div`
  max-width: ${props => props.theme.pageWidth};
  margin: 2rem auto;
  padding: 0 2rem;
  input[type="button"] {
    max-width: 40%;
    border-radius: 0.25rem;
    background-color: #eee;
    border: none;
    color: ${props => props.theme.brand};
    padding: 1rem 2rem;
    margin: 0.5rem;
    cursor: pointer;
  }
  input[name="deleteHome"] {
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
  }
  .single-home {
    max-width: 35rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 0.5rem;
    margin: 2.5rem auto 0;

    a {
      input {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 540px) {
    input[type="button"] {
      max-width: 70%;
    }
  }
`;

export default class Home extends Component {
  state = {
    address: "",
    city: "",
    state: "",
    zip: "",
    code: ""
  };

  // Get a single home using the id from the params
  getHome = () => {
    const BACKEND_API_URL =
      process.env.NODE_ENV !== "production"
        ? `http://localhost:5000/api/homes/${this.props.match.params.id}`
        : `https://protected-oasis-33800.herokuapp.com/api/homes/${this.props.match.params.id}`;

    axios
      .get(`${BACKEND_API_URL}`)
      .then(req => {
        const { address, city, state, zip, code } = req.data.data;
        return this.setState({
          address,
          city,
          state,
          zip,
          code
        });
      })
      .catch(err => console.log(err));
  };

  deleteHome = () => {
    axios
      .delete(`http://localhost:5000/api/homes/${this.props.match.params.id}`)
      .then(res => {
        if (res.data.redirect === "/homes") {
          window.location = "/homes";
        }
      })
      .catch(err => console.log(err));
  };

  async componentDidMount() {
    this.getHome();
  }

  render() {
    const { address, city, state, zip, code } = this.state;
    return (
      <StyledHome>
        <h2>Home with the following information: </h2>
        <div className="single-home">
          <label>Address:</label>
          {address ? <p>{address}</p> : <p>N/A</p>}
          <label>City:</label>
          {city ? <p>{city}</p> : <p>N/A</p>}
          <label>State:</label>
          {state ? <p>{state}</p> : <p>N/A</p>}
          <label>Zip Code:</label>
          {zip ? <p>{zip}</p> : <p>N/A</p>}
          <label>Gate Code:</label>
          {code ? <p>{code}</p> : <p>N/A</p>}
          <Link
            className="edit"
            to={`/homes/${this.props.match.params.id}/edit`}
          >
            <input type="button" name="editHome" value="Edit" />
          </Link>
          <input
            type="button"
            name="deleteHome"
            value="Delete"
            onClick={this.deleteHome}
          />
        </div>
      </StyledHome>
    );
  }
}
