import styled from "styled-components";

const Container = styled.div`
  max-width: ${props => props.theme.pageWidth};
  margin: 2rem auto;
  padding: 0 1rem;
  @media screen and (min-width: 768px) {
    padding: 0 2rem;
  }
`;

export default Container;
