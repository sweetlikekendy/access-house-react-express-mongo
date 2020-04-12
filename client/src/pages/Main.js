import React from "react";
import styled from "styled-components";
import DeliveryLady from "../assets/svgr/DeliveryLady";
import { Container } from "../styles";

const StyledMain = styled.div`
  h2 {
    margin-top: 2rem;
  }
  p {
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
  }
`;

const StyledContainer = styled.div`
  margin-top: 4rem;
  height: 500px;
  text-align: center;
`;

const Main = () => (
  <Container>
    <StyledMain>
      <h2>"Let Me In" Application</h2>
      <p>
        Allows delivery drivers to input addresses with access codes into a
        database. Drivers can search for existing homes by address
        (case-sensitive). Drivers can update an existing home. Drivers are also
        allowed to delete a home.
      </p>
      <StyledContainer>
        <DeliveryLady />
      </StyledContainer>
    </StyledMain>
  </Container>
);

export default Main;
