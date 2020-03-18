import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import styled from "styled-components";
import HomeRow from "./HomeRow";

const StyledHomeTable = styled.table`
  max-width: ${props => props.theme.pageWidth};
  margin: 2rem auto;
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
      console.log(home._id);
      rows.push(<HomeRow home={home} key={home._id} />);
    });

    return (
      <StyledHomeTable>
        {rows && rows.length ? (
          <>
            <thead>
              <tr>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Gate Code</th>
              </tr>
            </thead>
            <tbody>{rows.slice(0).reverse()}</tbody>
          </>
        ) : (
          <p>
            No homes added. Please add a home <Link to="/addHome">here</Link>
          </p>
        )}
      </StyledHomeTable>
    );
  }
}
