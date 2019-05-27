import React from "react";
import { BrowserRouter as Route, NavLink } from "react-router-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/">All Homes</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
