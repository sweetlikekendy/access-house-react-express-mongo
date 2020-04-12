import React from "react";
import NavMenu from "./NavMenu";
import { HeaderStyles } from "../styles";

const Header = props => {
  return (
    <HeaderStyles>
      <NavMenu theme={props.theme} />
    </HeaderStyles>
  );
};

export default Header;
