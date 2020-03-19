import * as React from "react";
import { theme } from "../../styles/";

const { fontColor } = theme;

function SvgPadlockUnlockGray(props) {
  return (
    <svg height={20} viewBox="0 0 13.1 17.96" {...props}>
      <path
        d="M11.252 7.839H3.37V5.876a3.184 3.184 0 013.18-3.18c1.432 0 2.694.964 3.069 2.343a.848.848 0 001.637-.445A4.885 4.885 0 006.55 1a4.882 4.882 0 00-4.876 4.876v1.981a.85.85 0 00-.674.83v7.424c0 .468.38.849.848.849h9.404a.85.85 0 00.848-.849V8.687a.85.85 0 00-.848-.848m-3.563 6.347a.136.136 0 01-.138.167h-1.98a.136.136 0 01-.138-.167l.316-1.67a1.19 1.19 0 111.622-.018z"
        fill={`${fontColor}`}
      />
    </svg>
  );
}

export default SvgPadlockUnlockGray;
