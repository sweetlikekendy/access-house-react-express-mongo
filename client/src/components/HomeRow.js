import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";

export default class HomeRow extends Component {
  render() {
    const { _id, address, city, state, zip, code } = this.props.home;
    // const address = home.address;
    // const city = home.city;
    // const zip = home.zip;
    // const code = home.code;

    return (
      <tr>
        {address ? (
          <td>
            <Link to={`homes/${_id}`}>{address}</Link>
          </td>
        ) : (
          <Link to={`homes/${_id}`}>N/A</Link>
        )}
        {city ? (
          <td>
            <Link to={`homes/${_id}`}>{city}</Link>
          </td>
        ) : (
          <Link to={`homes/${_id}`}>N/A</Link>
        )}
        {state ? (
          <td>
            <Link to={`homes/${_id}`}>{state}</Link>
          </td>
        ) : (
          <Link to={`homes/${_id}`}>N/A</Link>
        )}
        {zip ? (
          <td>
            <Link to={`homes/${_id}`}>{zip}</Link>
          </td>
        ) : (
          <Link to={`homes/${_id}`}>N/A</Link>
        )}
        {code ? (
          <td>
            <Link to={`homes/${_id}`}>{code}</Link>
          </td>
        ) : (
          <Link to={`homes/${_id}`}>N/A</Link>
        )}
      </tr>
    );
  }
}
