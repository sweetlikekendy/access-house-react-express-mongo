import styled from "styled-components";
import theme from "./theme";

const { formBorderColor } = theme;

const Input = styled.input`
  width: ${props => props.width};
  padding: 1rem 1.5rem;
  /* border-radius: 3px; */
  border: 1px solid ${formBorderColor};
`;

export default Input;
