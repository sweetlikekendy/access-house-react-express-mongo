import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "../styles";
import { MapMarker, Unlock } from "../assets/svgr";

const { fontColor, formBorderColor } = theme;

const HomeResult = styled.div`
  position: relative;
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
    flex-basis: 210px;
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
      {children}
    </HomeResult>
  );
};

HomeInfo.propTypes = {};

export default HomeInfo;
