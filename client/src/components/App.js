import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import FilterableHomeTable from "./FilterableHomeTable";
import Home from "../pages/Home";
import AddHomeForm from "../pages/AddHomeForm";
import Header from "./Header";
import Main from "../pages/Main";
import UpdateHomeForm from "../pages/UpdateHomeForm";

const theme = {
  brand: "#a8d4ff",
  secondaryColor: "#76ffc1",
  hrefColor: "#9b76ff",
  bg: "245, 239, 223, 0.2",
  fontColor: "#2c2c38"
};

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
`;

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Router>
            <div className="App">
              <Header theme={theme} />
              <Route
                exact
                path="/addHome"
                render={props => <AddHomeForm {...props} theme={theme} />}
              />
              <Route exact path="/homes" component={FilterableHomeTable} />
              <Route
                exact
                path="/homes/:id"
                render={props => <Home {...props} theme={theme} />}
              />
              <Route
                exact
                path="/homes/:id/edit"
                render={props => <UpdateHomeForm {...props} theme={theme} />}
              />
              <Route exact path="/" component={Main} />
            </div>
          </Router>
        </>
      </ThemeProvider>
    );
  }
}

export default App;
