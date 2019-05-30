import React, { Component } from "react";

export default class Searchbar extends Component {
  handleFilterTextChange = e => {
    this.props.onFilterTextChange(e.target.value);
  };

  handleFilterTextChange = e => {
    this.props.onFilterTextChange(e.target.value);
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search Home Here..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    );
  }
}
