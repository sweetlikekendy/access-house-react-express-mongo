import React, { Component } from "react";
import styled from "styled-components";
import { Input } from "../styles/index";

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
        <Input
          width="100%"
          type="text"
          placeholder="Search Home Here..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    );
  }
}
