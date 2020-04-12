import styled from "styled-components";

const Header = styled.header`
  max-width: ${props => props.theme.pageWidth};
  height: 100px;
  margin: 0 auto;
  padding: 1rem;
  background-color: ${props => `rgba(${props.theme.bg})`};
  position: sticky;
  top: 0;
`;

export default Header;
