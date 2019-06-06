import React from "react";
import styled from "styled-components";

const StyledMain = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding: 0 2rem;
  h2 {
    margin-top: 2rem;
  }
  p {
    margin-top: 2.5rem;
  }
`;

const Main = () => (
  <StyledMain>
    <h2>"Let Me In" Application</h2>
    <p>
      Allows delivery drivers to input addresses with access codes into a
      database. Drivers can search for existing homes by address
      (case-sensitive). Drivers can update an existing home. Drivers are also
      allowed to delete a home.
    </p>
  </StyledMain>
);

export default Main;
