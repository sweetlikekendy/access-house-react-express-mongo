import styled from "styled-components";

const Header = styled.header`
  position: sticky;
  z-index: 10;
  max-width: ${props => props.theme.pageWidth};
  height: 100px;
  margin: 0 auto;
  padding: 1rem;
  background-color: ${props => `rgba(${props.theme.bg})`};
  top: 0;
`;

export default Header;
