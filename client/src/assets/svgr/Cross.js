import * as React from "react";
import { theme } from "../../styles/index";

const { badInputColor } = theme;

function SvgCross(props) {
  return (
    <svg viewBox="0 0 22.88 22.88" {...props}>
      <path
        d="M.324 1.909a1.14 1.14 0 010-1.587 1.14 1.14 0 011.587 0l9.523 9.539L20.973.322a1.12 1.12 0 011.571 0 1.112 1.112 0 010 1.587l-9.523 9.524 9.523 9.539a1.112 1.112 0 010 1.587 1.12 1.12 0 01-1.571 0l-9.539-9.539-9.523 9.539a1.14 1.14 0 01-1.587 0c-.429-.444-.429-1.159 0-1.587l9.523-9.539z"
        fill={`${badInputColor}`}
      />
    </svg>
  );
}

export default SvgCross;
