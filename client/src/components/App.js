import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homes from "./Homes";
import AddHomeForm from "./AddHomeForm";
import Header from "./Header";

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
          <AddHomeForm />
          <Route
            path="/"
            render={props => <Homes {...props} homes={this.state.homes} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
