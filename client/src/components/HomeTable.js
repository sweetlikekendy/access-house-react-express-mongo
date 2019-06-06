import React, { Component } from "react";
import HomeRow from "./HomeRow";
import styled from "styled-components";

const StyledHomeTable = styled.table`
  margin: 0 auto;
  border-collapse: collapse;
  width: 100%;
  height: 2rem;
  text-align: center;
  margin-top: 2.5rem;
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

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
      <StyledHomeTable>
        <thead>
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Gate Code</th>
          </tr>
        </thead>
        <tbody>{rows.slice(0).reverse()}</tbody>
      </StyledHomeTable>
    );
  }
}
