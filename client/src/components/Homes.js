import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Home from "./Home";

class Homes extends React.Component {
  render() {
    return (
      <div>
        <h2>Homes</h2>
        <ol>
          {this.props.homes && this.props.homes.length ? (
            // slice creates a shallow copy and the beginning on the array, then reverse the order
            this.props.homes
              .slice(0)
              .reverse()
              .map(home => (
                <li key={home._id}>
                  <Link to={`/homes/${home._id}`}>
                    {home.address} {home.city} {home.zip} {home.code}
                  </Link>
                </li>
              ))
          ) : (
            <p>
              No homes added. Please add a home <Link to="/addHome">here</Link>
            </p>
          )}
        </ol>
      </div>
    );
  }
}

export default Homes;
