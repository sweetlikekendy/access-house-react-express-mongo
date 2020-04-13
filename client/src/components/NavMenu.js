import React, { useState } from "react";
// eslint-disable-next-line
import { BrowserRouter as Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/svgr/Logo";
import { theme } from "../styles";

const { bg } = theme;

const StyledNav = styled.nav`
  height: 100%;
  /* Not on index page, display none the nav menus. Ids only exist on index page */

  padding: 1rem;
  .header-nav-menu {
    display: none;
  }
  #mobile-menu {
    display: block;
  }
  @media screen and (min-width: 768px) {
    .header-nav-menu {
      display: flex;
      align-items: center;
      height: 100%;
      white-space: nowrap;
      button:hover {
        /* link color */
      }
      li:first-of-type {
        margin-left: 0;
      }
      li {
        margin-left: 3rem;
        position: relative;
      }
    }
    #mobile-menu {
      display: none;
    }
  }
`;

const LogoContainer = styled.div`
  width: 60px;
  height: 60px;
`;

const StyledMenu = styled.nav`
  position: absolute;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* header bg color */
  background-color: ${`rgba(${bg})`};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  text-align: left;
  padding: 1rem;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  width: 75%;
  overflow: hidden;
  box-shadow: ${({ open }) => open && `5px -5px 10px #cfcfcf`};
  li:first-of-type {
    display: flex;
    justify-content: center;
  }
`;

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <ul>
        <li className="nav-item">
          <LogoContainer>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </LogoContainer>
        </li>
        <li className="nav-item">
          <NavLink to="/homes">All Homes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/addHome">Add a Home</NavLink>
        </li>
      </ul>
    </StyledMenu>
  );
};

const StyledBurger = styled.button`
  position: absolute;
  top: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    /* if open nav text color else some other color */
    background: ${({ open }) => (open ? `red` : `black`)};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: left;

    :first-of-type {
      transform: ${({ open }) => (open ? "rotate(43deg)" : "rotate(0)")};
    }

    :nth-of-type(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-of-type(3) {
      transform: ${({ open }) => (open ? "rotate(-43deg)" : "rotate(0)")};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

const handleClick = () => {
  let linksEl = document.querySelector(".mobile-nav-links");
  if (linksEl.style.display === "block") {
    linksEl.style.display = "none";
  } else linksEl.style.display = "block";
};

const NavMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledNav>
      <ul className="header-nav-menu">
        <li className="nav-item">
          <LogoContainer>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </LogoContainer>
        </li>
        <li className="nav-item">
          <NavLink to="/homes">All Homes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/addHome">Add a Home</NavLink>
        </li>
      </ul>
      <div id="mobile-menu">
        <Burger
          open={open}
          setOpen={setOpen}
          aria-label="hamburger menu button"
        />
        <Menu open={open} setOpen={setOpen} handleClick={handleClick} />
      </div>
    </StyledNav>
  );
};

export default NavMenu;
