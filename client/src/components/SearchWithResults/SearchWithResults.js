import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import * as JsSearch from "js-search";
import Searchbar from "./Searchbar";
import { HomeOptionMenu } from "../HomeOptionMenu";
import HomeInfo from "../HomeInfo";

const StyledFilterableHomeTable = styled.div`
  max-width: ${props => props.theme.formWidth};
  margin: 2rem auto;
  padding: 0 2rem;

  h2 {
    margin-bottom: 1rem;
  }
  #search-result-text {
    margin: 0.5rem;
    font-size: 16px;
  }
`;

class SearchWithResults extends Component {
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
  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  abortController = new AbortController();
  fetchData = async () => {
    const BACKEND_API_URI =
      process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api/homes"
        : "https://protected-oasis-33800.herokuapp.com/api/homes";
    try {
      let result = await axios.get(`${BACKEND_API_URI}`, {
        cancelToken: this.source.token
      });
      return result.data.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        throw new Error("Cancelled");
      }
    }
  };
  async componentDidMount() {
    this.fetchData()
      .then(data => {
        this.setState({ homeList: data });
        this.rebuildIndex();
      })
      .catch(err => {
        this.setState({ isError: true });
        console.log(`====================================`);
        console.log(`Something bad happened while fetching the data\n${err}`);
        console.log(`====================================`);
      });
  }
  async componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
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
        <p id="search-result-text">
          {searchQuery === ""
            ? `${queryResults.length} items to search from`
            : `${queryResults.length} items found from search query`}
        </p>
        <div>
          {queryResults.map(item => {
            const { _id, address, city, state, zip, code } = item;
            return (
              <HomeInfo
                key={_id}
                address={address}
                city={city}
                state={state}
                zip={zip}
                code={code}
              >
                <HomeOptionMenu className="three-dot-menu" id={_id} />
              </HomeInfo>
            );
          })}
        </div>
      </StyledFilterableHomeTable>
    );
  }
}

export default SearchWithResults;
