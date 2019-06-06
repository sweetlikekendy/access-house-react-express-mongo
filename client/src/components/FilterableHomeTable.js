import React from "react";
import styled from "styled-components";
// import { BrowserRouter as Route, Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import HomeTable from "./HomeTable";

const StyledFilterableHomeTable = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding: 0 2rem;
`;

class FilterableHomeTable extends React.Component {
  state = {
    homes: [
      {
        address: "",
        city: "",
        zip: "",
        code: ""
      }
    ],
    filterText: ""
  };

  onFilterTextChange = filterText => {
    this.setState({
      filterText
    });
  };

  getHomes = () =>
    fetch("http://localhost:5000/homes")
      .then(res => res.json())
      .then(homes => this.setState({ homes: homes.data }))
      .catch(err => console.error(err));

  componentDidMount() {
    this.getHomes();
  }

  render() {
    return (
      <StyledFilterableHomeTable>
        <h2>Homes</h2>
        <Searchbar
          filterText={this.state.filterText}
          onFilterTextChange={this.onFilterTextChange}
        />
        <HomeTable
          homes={this.state.homes}
          filterText={this.state.filterText}
        />
        {/*
        <ol>
          {this.state.homes && this.state.homes.length ? (
            // slice creates a shallow copy and the beginning on the array, then reverse the order
            this.state.homes
              .slice(0)
              .reverse()
              .map(home => (
                <li key={home._id}>
                  <Link to={`/homes/${home._id}`}>
                    {home.address} {home.city} {home.zip} {home.code}
                  </Link>
                </li>
              ))
          ) : (
            <p>
              No homes added. Please add a home <Link to="/addHome">here</Link>
            </p>
          )}
        </ol>
        */}
      </StyledFilterableHomeTable>
    );
  }
}

export default FilterableHomeTable;
