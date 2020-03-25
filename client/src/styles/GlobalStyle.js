import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: calc(16px + (18 - 14) * ((100vw - 300px) / (1600 - 300)));
    background-color: rgba(${props => props.theme.bg});
    color: ${props => props.theme.fontColor};
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
    line-height: 1.8;
  }
  ol, ul {
    list-style: none;
  }
  body {
    font-family: sans-serif;
  }
  /* Custom Global Styles */
  html, body {
    height: 100%;
    font-weight: 300;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.hrefColor};
    font-weight: 700;
  }
  h1, h2 {
    font-weight: 700;
    line-height: 1.2;
  }

  input:focus, textarea:focus, select:focus{
    outline: none;
  }

  input:focus,
  select:focus {
    border-bottom: 2px solid ${props => props.theme.inputActiveColor};
  }

  .no-border {
    border: none !important;
  }
  .call-to-action-button {
    width: 150px;
    border: none;
    cursor: pointer;
    padding: 1rem 1.5rem;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
    background-color: ${props => props.theme.buttonCallToActionBgColor};
    color: white;

    &:focus {
      border-bottom: none;
    }
  }
  .button {
    width: 150px;
    border: none;
    cursor: pointer;
    padding: 1rem 1.5rem;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
    background-color: ${props => props.theme.buttonBgColor};

    &:focus {
      border-bottom: none;
    }
  }
  .button:hover, .call-to-action-button:hover {
    opacity: 0.7;
  }
`;

export default GlobalStyle;
