import React from "react";
import NavMenu from "./NavMenu";

const Header = props => {
  return (
    <header>
      <NavMenu theme={props.theme} />
    </header>
  );
};

export default Header;
