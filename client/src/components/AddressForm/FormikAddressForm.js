import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import { Input, Select, RightAlignButton, theme } from "../../styles/";
import { Cross, Tick } from "../../assets/svgr/index";
import { StateValues } from "../../lib/";

const { formTextColor, letterSpacing, badInputColor, goodInputColor } = theme;
const stateValues = StateValues;

const InputDiv = styled.div`
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
  .error {
    color: ${badInputColor};
  }
`;

const FieldSet = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

const StyledForm = styled.form`
  max-width: 35rem;
  display: flex;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "address address"
    "city state"
    "zip code"
    "fake button";
  grid-gap: 1rem;
  margin: 0 auto;

  input[type="submit"] {
    grid-area: button;
  }

  #address {
    grid-area: address;
  }
  #city {
    grid-area: city;
  }
  #state {
    grid-area: state;
  }
  #zip {
    grid-area: zip;
  }
  #code {
    grid-area: code;
  }
  #id {
    grid-area: fake;
  }
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "address"
      "city"
      "state"
      "zip"
      "code"
      "button";

    input[type="submit"] {
      width: 100%;
      margin: 0;
    }
  }
`;

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);

  return (
    <InputDiv id={field.name}>
      <label
        id={`${field.name}-label`}
        className={props.focus ? "focused" : ""}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <Input
        className={`text-input
          ${meta.touched && meta.error ? "bad-input" : ""} 
         ${meta.touched && !meta.error ? "good-input" : ""}`}
        id={`${field.name}-input`}
        width="100%"
        {...field}
        {...props}
      />
      <Cross
        className={`cross ${
          meta.touched && meta.error ? "display-cross" : null
        }`}
        width="1em"
      />
      <Tick
        className={`tick ${
          meta.touched && !meta.error ? "display-tick" : null
        }`}
        width="1em"
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </InputDiv>
  );
};

const MySelectInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <InputDiv id={field.name}>
      <label
        id={`${field.name}-label`}
        className={props.focus ? "focused" : ""}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <Select
        className={`select-input
          ${meta.touched && meta.error ? "bad-input" : ""} 
         ${meta.touched && !meta.error ? "good-input" : ""}`}
        id={`${field.name}-input`}
        width="100%"
        {...field}
        {...props}
      />
      <Cross
        className={`cross ${
          meta.touched && meta.error ? "display-cross" : null
        }`}
        width="1em"
      />
      <Tick
        className={`tick ${
          meta.touched && !meta.error ? "display-tick" : null
        }`}
        width="1em"
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </InputDiv>
  );
};

const FormikAddressForm = props => {
  const [addressFocus, setAddressFocus] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);
  const [stateFocus, setStateFocus] = useState(false);
  const [zipFocus, setZipFocus] = useState(false);
  const [codeFocus, setCodeFocus] = useState(false);
  const inputFieldFocusIn = e => {
    // get the corresponding input field
    const { name } = e.target;

    // 2. if the input field clicked on, set focus to true
    if (e.target === document.activeElement) {
      switch (name) {
        case "address":
          setAddressFocus(true);
          break;
        case "city":
          setCityFocus(true);
          break;
        case "state":
          setStateFocus(true);
          break;
        case "zip":
          setZipFocus(true);
          break;
        case "code":
          setCodeFocus(true);
          break;
        default:
          console.log(name, "no name here");
          break;
      }
    }
  };

  const inputFieldFocusOut = ({ target: { name, value } }) => {
    // if input field is not empty, set focus to false
    if (!value) {
      switch (name) {
        case "address":
          setAddressFocus(false);
          break;
        case "city":
          setCityFocus(false);
          break;
        case "state":
          setStateFocus(false);
          break;
        case "zip":
          setZipFocus(false);
          break;
        case "code":
          setCodeFocus(false);
          break;
        default:
          console.log(name, "no name here");
          break;
      }
    }
  };

  const delegate = selector => cb => e => e.target.matches(selector) && cb(e);

  const inputTextDelegate = delegate("input[type=text]");
  const inputTelDelegate = delegate("input[type=tel]");
  const inputSelectDelegate = delegate("select");

  useEffect(() => {
    // Text event listeners
    window.addEventListener(
      "focusin",
      inputTextDelegate(el => inputFieldFocusIn(el))
    );

    window.addEventListener(
      "focusout",
      inputTextDelegate(el => inputFieldFocusOut(el))
    );
    // Tel event listeners
    window.addEventListener(
      "focusin",
      inputTelDelegate(el => inputFieldFocusIn(el))
    );

    window.addEventListener(
      "focusout",
      inputTelDelegate(el => inputFieldFocusOut(el))
    );
    // Select event listeners
    window.addEventListener(
      "focusin",
      inputSelectDelegate(el => inputFieldFocusIn(el))
    );

    window.addEventListener(
      "focusout",
      inputSelectDelegate(el => inputFieldFocusOut(el))
    );
  });

  return (
    <FieldSet>
      <Formik
        initialValues={{
          address: "",
          city: "",
          state: "",
          zip: "",
          code: ""
        }}
        validationSchema={Yup.object({
          address: Yup.string()
            .max(30, "Must be 30 characters or less")
            .required("Required"),
          city: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          state: Yup.string()
            .oneOf(stateValues, "Invalid State")
            .required("Required"),
          zip: Yup.string()
            .max(10, "Must be 10 characters or less")
            .required("Required"),
          code: Yup.string()
            .max(10, "Must be 10 characters or less")
            .required("Required")
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {formik => (
          <StyledForm
            name="contact"
            method="POST"
            // action="/success"
          >
            <MyTextInput
              label="Address"
              name="address"
              type="text"
              focus={addressFocus}
            />
            <MyTextInput
              label="City"
              name="city"
              type="text"
              focus={cityFocus}
            />
            <MySelectInput
              label="State"
              name="state"
              type="text"
              focus={stateFocus}
            />
            <MyTextInput label="Zip" name="zip" type="tel" focus={zipFocus} />
            <MyTextInput
              label="Code"
              name="code"
              type="tel"
              focus={codeFocus}
            />

            <RightAlignButton>
              <input
                className="call-to-action-button"
                type="submit"
                value="SUBMIT"
              />
            </RightAlignButton>
          </StyledForm>
        )}
      </Formik>
    </FieldSet>
  );
};

FormikAddressForm.propTypes = {};

export default FormikAddressForm;
