import React from "react";
import styled from "styled-components";
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
    fetch("http://localhost:5000/api/homes")
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
      </StyledFilterableHomeTable>
    );
  }
}

export default FilterableHomeTable;
