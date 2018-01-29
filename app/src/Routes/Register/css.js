import { css } from "emotion";
// import { queries } from "../../css.js";

export const container = css`
  height: calc(100vh - 52px);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const content = css`
  grid-area: content;
`;

export const input = css`
  border: solid 1px red;
  width: 65vw;
  height: 3vh;
  font-size: xx-large;
`;
