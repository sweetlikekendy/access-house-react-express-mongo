import styled from "styled-components";
import theme from "./theme";

const { formBorderColor, letterSpacing } = theme;

const Input = styled.input`
  width: ${props => props.width};
  font-size: 16px;
  letter-spacing: ${letterSpacing};
  padding: 1rem 1.5rem;
  /* border-radius: 3px; */
  border: 1px solid ${formBorderColor};
`;

export default Input;
