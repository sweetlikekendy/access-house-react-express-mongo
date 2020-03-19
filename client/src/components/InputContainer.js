import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, Select, theme } from "../styles/index";
import { Cross, Tick } from "../assets/svgr/index";

const { formTextColor, letterSpacing, badInputColor, goodInputColor } = theme;

const InputStyles = styled.div`
  position: relative;
  font-size: 18px;
  label {
    padding: 0 0.25rem;
    outline: none;
    background-color: #fff;
    font-size: 16px;
    letter-spacing: ${letterSpacing};
    color: ${formTextColor};
    position: absolute;
    left: 1em;
    top: 1em;
    pointer-events: none;
    transition: ease-in-out, top 0.2s ease-in-out;
  }
  label:after {
    content: "*";
    color: ${badInputColor};
    margin-left: 4px;
  }

  .focused {
    top: -0.75em;
  }
  .bad-input {
    border-bottom: 2px solid ${badInputColor};
  }
  .good-input {
    border-bottom: 2px solid ${goodInputColor};
  }
  .cross,
  .tick {
    display: none;
    position: absolute;
    top: 1em;
    right: 1em;
  }
  .display-cross,
  .display-tick {
    display: block;
  }
`;

const InputContainer = ({
  type,
  name,
  loadCount,
  isEmpty,
  isActive,
  stateOfInput,
  dataMissingError,
  dataParseError,
  handleInputChange,
  ...props
}) => {
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <InputStyles {...props}>
      {type === "select" ? (
        <Select
          id={`${name}-input`}
          className={
            isEmpty ? "bad-input" : loadCount !== 0 ? "good-input" : ""
          }
          name="state"
          data-missing-error="Please select a State"
          data-parse-error="Invalid value"
          data-range-error="Value too long or too short"
          required="required"
          value={stateOfInput}
          onChange={handleInputChange}
        />
      ) : (
        <Input
          id={`${name}-input`}
          // If the state is empty and the input field has not been changed or visited once,
          // display bad input
          className={
            isEmpty ? "bad-input" : loadCount !== 0 ? "good-input" : ""
          }
          width="100%"
          type="text"
          name={`${name}`}
          valueMaxlength="20"
          data-missing-error={`${dataMissingError}`}
          data-parse-error={`${dataParseError}`}
          value={stateOfInput}
          onChange={handleInputChange}
          required
        />
      )}
      <label
        id={`${name}-label"`}
        className={isActive ? "focused" : ""}
        htmlFor={`${name}`}
      >
        {capitalizeFirstLetter(name)}
      </label>
      <Cross
        className={`cross ${
          isEmpty ? "display-cross" : loadCount !== 0 ? "" : ""
        }`}
        width="1em"
      />
      <Tick
        className={`tick ${
          isEmpty ? "" : loadCount !== 0 ? "display-tick" : ""
        }`}
        width="1em"
      />
    </InputStyles>
  );
};

InputContainer.propTypes = {};

export default InputContainer;
