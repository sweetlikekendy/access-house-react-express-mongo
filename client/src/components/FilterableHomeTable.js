import React from "react";
import styled from "styled-components";
import Searchbar from "./Searchbar";
import HomeTable from "./HomeTable";

const StyledFilterableHomeTable = styled.div`
  max-width: ${props => props.theme.pageWidth};
  margin: 2rem auto;
  padding: 0 2rem;

  h2 {
    margin-bottom: 1rem;
  }
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

  getHomes = () => {
    const BACKEND_API_URL =
      process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api/homes"
        : "https://protected-oasis-33800.herokuapp.com/api/homes";

    fetch(`${BACKEND_API_URL}`)
      .then(res => res.json())
      .then(homes => this.setState({ homes: homes.data }))
      .catch(err => console.error(err));
  };

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
