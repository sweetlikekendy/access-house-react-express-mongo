import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homes from "./Homes";
import Home from "./Home";
import AddHomeForm from "./AddHomeForm";
import Header from "./Header";
import Main from "./Main";
import UpdateHomeForm from "./UpdateHomeForm";

class App extends React.Component {
  state = {
    homes: [
      {
        address: "",
        city: "",
        zip: "",
        code: ""
      }
    ]
  };

  getHomes = () =>
    fetch("http://localhost:5000/homes")
      .then(res => res.json())
      .then(homes => this.setState({ homes: homes.data }))
      .catch(err => console.error(err));

  componentDidMount() {
    this.getHomes();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/addHome" component={AddHomeForm} />
          <Route
            exact
            path="/homes"
            render={props => <Homes {...props} homes={this.state.homes} />}
          />
          <Route
            exact
            path="/homes/:id"
            render={props => <Home {...props} homes={this.state.homes} />}
          />
          <Route
            exact
            path="/homes/:id/edit"
            render={props => (
              <UpdateHomeForm {...props} homes={this.state.homes} />
            )}
          />
          <Route exact path="/" component={Main} />
        </div>
      </Router>
    );
  }
}

export default App;
