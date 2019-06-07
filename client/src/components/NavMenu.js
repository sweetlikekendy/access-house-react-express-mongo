import React, { Component } from "react";
import { BrowserRouter as Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const StyledNav = styled.nav`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  h1 {
    text-decoration: none;
  }
  ul > li {
    a {
      color: ${props => props.theme.secondaryColor};
    }
    margin-right: 1rem;
  }
  h1 > a {
    color: ${props => props.theme.brand};
  }
  .menu {
    margin-right: 1rem;
    ul > li {
      a {
        color: ${props => props.theme.secondaryColor};
      }
      display: inline;
      margin-right: 1rem;
    }
  }

  .mobile-menu {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    .menu {
      display: none;
    }
    .mobile-menu {
      display: block;
      margin-top: 0.4rem;
      .bars {
        display: block;
        cursor: pointer;
        color: ${props => props.theme.secondaryColor};
      }
      .mobile-nav-links {
        display: none;
        margin-top: 0.65rem;
      }
    }
  }
`;

class NavMenu extends Component {
  handleClick = () => {
    let linksEl = document.querySelector(".mobile-nav-links");
    if (linksEl.style.display === "block") {
      linksEl.style.display = "none";
    } else linksEl.style.display = "block";
  };

  render() {
    return (
      <StyledNav>
        <div className="menu">
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
        </div>
        <div className="mobile-menu">
          <FontAwesomeIcon
            className="bars"
            icon={faBars}
            onClick={this.handleClick}
          />
          <ul className="mobile-nav-links">
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
        </div>
        <h1>
          <NavLink to="/">LET ME IN</NavLink>
        </h1>
      </StyledNav>
    );
  }
}

export default NavMenu;
