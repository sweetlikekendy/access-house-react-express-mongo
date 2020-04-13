import * as React from "react";
import { theme } from "../../styles/index";

const { brand } = theme;

function SvgMapMarkerAlt(props) {
  return (
    <svg
      height={25}
      style={{
        zIndex: "-1",
        msTransform: "rotate(360deg)",
        WebkitTransform: "rotate(360deg)"
      }}
      transform="rotate(360)"
      viewBox="0 0 384 512"
      {...props}
    >
      <path
        d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
        fill={`${brand}`}
      />
      <path fill="rgba(0, 0, 0, 0)" d="M0 0h384v512H0z" />
    </svg>
  );
}

export default SvgMapMarkerAlt;
