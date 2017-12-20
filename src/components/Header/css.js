import { css } from "emotion";
import { queries } from "../../css.js";

export const container = css`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.15);
  height: 50px;
  width: 99%;
  ${queries.small`
    height: 75px;
    `};
`;

export const avatar = css`
  border-radius: 50%;
  height: 90%;
  cursor: pointer;
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  margin-left: 20px;
  background: rgba(0, 0, 0, 0.26);
  color: white;
`;

export const item = css`
  border: solid 1px red;
`;

export const test = css``;
