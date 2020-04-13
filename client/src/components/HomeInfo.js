import React from "react";
import styled from "styled-components";
import { theme } from "../styles";
import { MapMarker, Unlock } from "../assets/svgr";
import { HomeOptionMenu } from "./HomeOptionMenu";
const { fontColor, formBorderColor } = theme;

const HomeResult = styled.div`
  /* keep this div lower than the mobile menu  */
  /* position: relative; */
  /* z-index: -1; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid ${formBorderColor};

  .map-marker {
    flex-basis: 8%;
    margin-right: 0.5rem;
  }
  .location {
    flex-basis: 75%;
    color: ${fontColor};
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    .address,
    .gate-code {
      flex-basis: 100%;
    }
    .gate-code {
      color: ${fontColor};
      display: flex;
      align-items: center;
      #key-icon {
        margin-right: 0.5rem;
      }
    }
  }

  @media screen and (min-width: 500px) {
    .location {
      flex-basis: 300px;
    }
  }
  @media screen and (min-width: 768px) {
    .location {
      flex-basis: 375px;
      font-size: 16px;

      .address {
        flex-basis: 70%;
      }
      .gate-code {
        flex-basis: 20%;
      }
    }
  }
`;

const HomeInfo = ({
  id,
  address,
  city,
  state,
  zip,
  code,
  children,
  ...props
}) => {
  return (
    <HomeResult className="query-result" {...props}>
      <MapMarker className="map-marker" />
      <div className="location">
        <div className="address">
          <p>{address}</p>
          <p>
            {city}, {state} {zip}
          </p>
        </div>
        <div className="gate-code">
          <Unlock id="key-icon" />
          <p>{code}</p>
        </div>
      </div>
      {/* this is so that the menu option doesn't show up on the update home page */}
      {children}
    </HomeResult>
  );
};
export default HomeInfo;
