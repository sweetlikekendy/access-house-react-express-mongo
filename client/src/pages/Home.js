import React, { Component } from "react";
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const StyledHome = styled.div`
  margin-top: 2rem;
  padding: 0 2rem;
  input[type="button"] {
    border-radius: 0.25rem;
    background-color: #eee;
    border: none;
    color: ${props => props.theme.brand};
    padding: 1rem 2rem;
    margin: 0.5rem;
  }
  input[name="deleteHome"] {
    min-width: 50%;
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
`;

export default class Home extends Component {
  state = {
    address: "",
    city: "",
    zip: "",
    code: ""
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

  deleteHome = () => {
    axios
      .delete(`http://localhost:5000/homes/${this.props.match.params.id}`)
      .then(res => {
        if (res.data.redirect === "/homes") {
          window.location = "/homes";
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getHome();
  }

  render() {
    return (
      <StyledHome>
        <h2>Home with the following information: </h2>
        <div className="single-home">
          <label>Address:</label>
          <p>{this.state.address}</p>
          <label>City:</label>
          <p>{this.state.city}</p>
          <label>Zip Code:</label>
          <p>{this.state.zip}</p>
          <label>Gate Code:</label>
          <p>{this.state.code}</p>
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
