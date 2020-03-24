import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line
import { BrowserRouter as Route, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ThreeDotMenu } from "../../assets/svgr";
import { theme } from "../../styles";

const { dropdownMenuBgColor, fontColor } = theme;

const Container = styled.div`
  position: absolute;
  top: 20%;
  right: 5%;
  cursor: pointer;
  a {
    color: ${fontColor};
  }
`;

const DropdownMenu = styled.div`
  cursor: default;
  position: relative;
`;

const MenuList = styled.ul`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  font-size: 16px;
  background-color: ${dropdownMenuBgColor};
  li {
    color: ${fontColor};
    padding: 0.5rem;
  }
  .delete-button {
    color: ${fontColor};
    background-color: ${dropdownMenuBgColor};
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 0;
    outline: none;
  }
`;

const DotsContainer = styled.div`
  padding: 0.1rem;
  background-color: ${({ openState }) => openState && `${dropdownMenuBgColor}`};
  svg {
    circle {
      fill: ${({ openState }) => openState && `${fontColor}`};
    }
  }
`;

const HomeOptionMenu = ({ id, ...props }) => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const handleClick = () => {
    setOpen(prevState => {
      return !prevState;
    });
  };

  // Handle click outside of lightbox modal. If the user clicks outside of the modal, close it.
  const handleClickOutside = e => {
    // if user clicks inside the target (modal), do not close. Else close the modal.
    if (node.current.contains(e.target)) {
      setOpen(true);
      return;
    }
    setOpen(false);
  };

  // Hook for handling click outside of the menu
  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const BACKEND_API_URI =
    process.env.NODE_ENV !== "production"
      ? `http://localhost:5000/api/homes/${id}`
      : `https://protected-oasis-33800.herokuapp.com/api/homes/${id}`;

  const deleteHome = () => {
    axios
      .delete(`${BACKEND_API_URI}`)
      .then(res => {
        // if (res.status === 204) {
        //   window.location = "/homes";
        //   return false;
        // }
        if (res.data.redirect === "/homes") {
          window.location = "/homes";
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Container ref={node} {...props}>
      <DotsContainer onClick={handleClick} openState={open}>
        <ThreeDotMenu />
      </DotsContainer>
      {open && (
        <DropdownMenu>
          <MenuList>
            <Link to={`/homes/${id}/edit`}>
              <li>Edit</li>
            </Link>
            <button
              className="delete-button"
              type="button"
              onClick={deleteHome}
            >
              <li>Delete</li>
            </button>
          </MenuList>
        </DropdownMenu>
      )}
    </Container>
  );
};

export default HomeOptionMenu;
