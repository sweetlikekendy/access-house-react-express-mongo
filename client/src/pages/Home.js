import React, { Component } from "react";
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
import axios from "axios";

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
      <>
        <h2>{this.state.address}</h2>
        <p>{this.state.city}</p>
        <p>{this.state.zip}</p>
        <p>{this.state.code}</p>
        <Link to={`/homes/${this.props.match.params.id}/edit`}>
          <input type="button" name="editHome" value="Edit" />
        </Link>
        <input
          type="button"
          name="deleteHome"
          value="Delete"
          onClick={this.deleteHome}
        />
      </>
    );
  }
}
