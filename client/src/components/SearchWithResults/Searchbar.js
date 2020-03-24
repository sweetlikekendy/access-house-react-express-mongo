import React, { Component } from "react";
import styled from "styled-components";
import { Input } from "../../styles/index";
import { theme } from "../../styles/index";

const { brand } = theme;

const Form = styled.form`
  input:focus {
    border: none;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px ${brand};
  }
`;

export default class Searchbar extends Component {
  render() {
    const { value, searchData } = this.props;

    return (
      <Form>
        <Input
          width="100%"
          type="text"
          placeholder="Search Home Here..."
          value={value}
          onChange={searchData}
        />
      </Form>
    );
  }
}
