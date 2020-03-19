import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";
import * as JsSearch from "js-search";
import Searchbar from "./Searchbar";
import { MapMarker, Unlock, ThreeDotMenu } from "../assets/svgr/";
import { theme } from "../styles";

const { fontColor, formBorderColor } = theme;

const StyledFilterableHomeTable = styled.div`
  max-width: 800px;
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

const ResultsQuery = styled.div`
  .query-result {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-bottom: 1px solid ${formBorderColor};
    .map-marker {
      flex-basis: 8%;
      margin-right: 0.5rem;
    }
    .location {
      flex-basis: 210px;
      color: ${fontColor};
      font-size: 14px;
      display: flex;
      flex-wrap: wrap;
      .address,
      .gate-code {
        flex-basis: 100%;
      }
      .gate-code {
        color: ${fontColor};
        display: flex;
        align-items: center;
        #key-icon {
          margin-right: 0.5rem;
        }
      }
    }
    .three-dot-menu {
      position: absolute;
      top: 20%;
      right: 5%;
      cursor: pointer;
    }
  }
  @media screen and (min-width: 768px) {
    .query-result {
      .location {
        flex-basis: 375px;
        font-size: 16px;

        .address {
          flex-basis: 70%;
        }
        .gate-code {
          flex-basis: 20%;
        }
      }
    }
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
        <p id="search-result-text">
          {searchQuery === ""
            ? `${queryResults.length} items to search from`
            : `${queryResults.length} items found from search query`}
        </p>
        <ResultsQuery>
          {queryResults.map(item => {
            const { _id, address, city, state, zip, code } = item;
            return (
              <div key={`${_id}`} className="query-result">
                <MapMarker className="map-marker" />
                <div className="location">
                  <div className="address">
                    <p>{address}</p>
                    <p>
                      {city}, {state} {zip}
                    </p>
                  </div>
                  <div className="gate-code">
                    <Unlock id="key-icon" />
                    <p>{code}</p>
                  </div>
                </div>
                <ThreeDotMenu className="three-dot-menu" />
              </div>
            );
          })}
        </ResultsQuery>
      </StyledFilterableHomeTable>
    );
  }
}

export default Search;
