import * as React from "react";
import { theme } from "../../styles";

const { formTextColor } = theme;

function Svg3DotsVerticalSolidMenu(props) {
  return (
    <svg height={17} viewBox="0 0 512 512">
      <circle fill={`${formTextColor}`} cx={256} cy={256} r={64} />
      <circle fill={`${formTextColor}`} cx={256} cy={448} r={64} />
      <circle fill={`${formTextColor}`} cx={256} cy={64} r={64} />
    </svg>
  );
}

export default Svg3DotsVerticalSolidMenu;
