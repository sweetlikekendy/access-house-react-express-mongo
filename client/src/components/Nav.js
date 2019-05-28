import React from "react";
import { BrowserRouter as Route, NavLink } from "react-router-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/">Main</NavLink>
      </li>
      <li>
        <NavLink to="/homes">All Homes</NavLink>
      </li>
      <li>
        <NavLink to="/addHome">Add a Home</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
