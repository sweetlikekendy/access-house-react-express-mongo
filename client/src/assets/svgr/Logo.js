import * as React from "react";

const SvgComponent = props => {
  return (
    <svg
      height="100%"
      width="100%"
      viewBox="0 0 120 120"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      {...props}
    >
      <circle
        cx={60}
        cy={60}
        r={59.709}
        fill="#f50057"
        stroke="#000"
        strokeWidth={0.24}
      />
      <text
        x={17.461}
        y={76.828}
        fontFamily="'Roboto-Regular','Roboto'"
        fontSize={48}
        fill="#fff"
        stroke="#000"
        strokeWidth={0.24}
        strokeLinecap="butt"
        strokeMiterlimit={2}
      >
        {"LE"}
        <tspan x={71.039} y={76.828}>
          {"T"}
        </tspan>
      </text>
    </svg>
  );
};

export default SvgComponent;
