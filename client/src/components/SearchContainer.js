import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";
import * as JsSearch from "js-search";
import Searchbar from "./Searchbar";

const StyledFilterableHomeTable = styled.div`
  max-width: ${props => props.theme.pageWidth};
  margin: 2rem auto;
  padding: 0 2rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

class Search extends Component {
  state = {
    homeList: [],
    search: [],
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: ``
  };
  /**
   * React lifecycle method to fetch the data
   */
  async componentDidMount() {
    const BACKEND_API_URL =
      process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api/homes"
        : "https://protected-oasis-33800.herokuapp.com/api/homes";

    Axios.get(`${BACKEND_API_URL}`)
      .then(result => {
        const homeData = result.data.data;
        this.setState({ homeList: homeData });
        this.rebuildIndex();
      })
      .catch(err => {
        this.setState({ isError: true });
        console.log(`====================================`);
        console.log(`Something bad happened while fetching the data\n${err}`);
        console.log(`====================================`);
      });
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    const { homeList } = this.state;

    const dataToSearch = new JsSearch.Search(`address`);

    /**
     *  defines a indexing strategy for the data
     * more more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy();

    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();

    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex(`address`);

    dataToSearch.addIndex(`address`); // sets the index attribute for the data
    dataToSearch.addIndex(`city`); // sets the index attribute for the data
    dataToSearch.addIndex(`state`); // sets the index attribute for the data
    dataToSearch.addIndex(`zip`); // sets the index attribute for the data
    dataToSearch.addIndex(`code`); // sets the index attribute for the data

    dataToSearch.addDocuments(homeList); // adds the data to be searched
    this.setState({ search: dataToSearch, isLoading: false });
  };

  /**
   * handles the input change and perfom a search with js-search
   * in which the results will be added to the state
   */
  searchData = e => {
    const { search } = this.state;
    const queryResult = search.search(e.target.value);
    this.setState({ searchQuery: e.target.value, searchResults: queryResult });
  };
  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const {
      isError,
      isLoading,
      homeList,
      searchResults,
      searchQuery
    } = this.state;
    const queryResults = searchQuery === `` ? homeList : searchResults;

    if (isLoading) {
      return (
        <div style={{ margin: `1.2rem 1rem 1.2rem 1rem` }}>
          <h1 style={{ marginTop: `3em`, textAlign: `center` }}>
            Getting the search all setup
          </h1>
        </div>
      );
    }
    if (isError) {
      return (
        <div style={{ margin: `1.2rem 1rem 1.2rem 1rem` }}>
          <h1 style={{ marginTop: `3em`, textAlign: `center` }}>Ohh no!!!!!</h1>
          <h3
            style={{
              marginTop: `2em`,
              padding: `2em 0em`,
              textAlign: `center`
            }}
          >
            Something really bad happened
          </h3>
        </div>
      );
    }
    return (
      <StyledFilterableHomeTable>
        <h2>Homes</h2>

        <Searchbar
          onSubmit={this.handleSubmit}
          value={searchQuery}
          searchData={this.searchData}
        />
        <div>
          Number of items:
          {queryResults.length}
          <table
            style={{
              width: `100%`,
              borderCollapse: `collapse`,
              borderRadius: `4px`,
              border: `1px solid #d3d3d3`
            }}
          >
            <thead style={{ border: `1px solid #808080` }}>
              <tr>
                <th
                  style={{
                    textAlign: `left`,
                    padding: `5px`,
                    fontSize: `14px`,
                    fontWeight: 600,
                    borderBottom: `2px solid #d3d3d3`,
                    cursor: `pointer`
                  }}
                >
                  Address
                </th>
                <th
                  style={{
                    textAlign: `left`,
                    padding: `5px`,
                    fontSize: `14px`,
                    fontWeight: 600,
                    borderBottom: `2px solid #d3d3d3`,
                    cursor: `pointer`
                  }}
                >
                  City
                </th>
                <th
                  style={{
                    textAlign: `left`,
                    padding: `5px`,
                    fontSize: `14px`,
                    fontWeight: 600,
                    borderBottom: `2px solid #d3d3d3`,
                    cursor: `pointer`
                  }}
                >
                  State
                </th>
                <th
                  style={{
                    textAlign: `left`,
                    padding: `5px`,
                    fontSize: `14px`,
                    fontWeight: 600,
                    borderBottom: `2px solid #d3d3d3`,
                    cursor: `pointer`
                  }}
                >
                  Zip
                </th>
                <th
                  style={{
                    textAlign: `left`,
                    padding: `5px`,
                    fontSize: `14px`,
                    fontWeight: 600,
                    borderBottom: `2px solid #d3d3d3`,
                    cursor: `pointer`
                  }}
                >
                  Code
                </th>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable */}
              {queryResults.map(item => {
                return (
                  <tr key={`row_${item._id}`}>
                    <td
                      style={{
                        fontSize: `14px`,
                        border: `1px solid #d3d3d3`
                      }}
                    >
                      <Link to={`homes/${item._id}`}>{item.address}</Link>
                    </td>
                    <td
                      style={{
                        fontSize: `14px`,
                        border: `1px solid #d3d3d3`
                      }}
                    >
                      <Link to={`homes/${item._id}`}>{item.city}</Link>
                    </td>
                    <td
                      style={{
                        fontSize: `14px`,
                        border: `1px solid #d3d3d3`
                      }}
                    >
                      <Link to={`homes/${item._id}`}>{item.state}</Link>
                    </td>
                    <td
                      style={{
                        fontSize: `14px`,
                        border: `1px solid #d3d3d3`
                      }}
                    >
                      <Link to={`homes/${item._id}`}>{item.zip}</Link>
                    </td>
                    <td
                      style={{
                        fontSize: `14px`,
                        border: `1px solid #d3d3d3`
                      }}
                    >
                      <Link to={`homes/${item._id}`}>{item.code}</Link>
                    </td>
                  </tr>
                );
              })}
              {/* eslint-enable */}
            </tbody>
          </table>
        </div>
      </StyledFilterableHomeTable>
    );
  }
}

export default Search;
