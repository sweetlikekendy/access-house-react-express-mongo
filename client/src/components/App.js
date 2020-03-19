import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "../pages/Home";
import AddHomeForm from "../pages/AddHomeForm";
import Header from "./Header";
import Main from "../pages/Main";
import UpdateHomeForm from "../pages/UpdateHomeForm";
import AllHomes from "../pages/AllHomes";
import { theme, GlobalStyle } from "../styles/index";

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
              {/* <Route exact path="/homes" component={FilterableHomeTable} /> */}
              <Route exact path="/homes" component={AllHomes} />
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
