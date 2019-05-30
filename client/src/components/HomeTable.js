import React, { Component } from "react";
import HomeRow from "./HomeRow";

export default class HomeTable extends Component {
  render() {
    const filterText = this.props.filterText;
    const homes = this.props.homes;

    const rows = [];
    homes.forEach(home => {
      if (home.address.indexOf(filterText) === -1) {
        return;
      }
      rows.push(<HomeRow home={home} key={home._id} />);
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Gate Code</th>
          </tr>
        </thead>
        <tbody>{rows.slice(0).reverse()}</tbody>
      </table>
    );
  }
}
