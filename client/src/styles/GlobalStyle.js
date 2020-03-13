import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: calc(16px + (18 - 14) * ((100vw - 300px) / (1600 - 300)));
    background-color: rgba(${theme.bg});
    color: ${theme.fontColor};
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
    color: ${theme.hrefColor};
    font-weight: 700;
  }
  h1, h2 {
    font-weight: 700;
    line-height: 1.2;
  }

  input:focus, textarea:focus, select:focus{
    outline: none;
  }
`;

export default GlobalStyle;
