import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";

export default class HomeRow extends Component {
  render() {
    const home = this.props.home;
    const address = home.address;
    const city = home.city;
    const zip = home.zip;
    const code = home.code;

    return (
      <tr>
        <td>
          <Link to={`homes/${home._id}`}>{address}</Link>
        </td>
        <td>
          <Link to={`homes/${home._id}`}>{city}</Link>
        </td>
        <td>
          <Link to={`homes/${home._id}`}>{zip}</Link>
        </td>
        <td>
          <Link to={`homes/${home._id}`}>{code}</Link>
        </td>
      </tr>
    );
  }
}
