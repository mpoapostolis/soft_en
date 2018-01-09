import { css } from "emotion";
import { queries } from "../../css.js";

export const container = css`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.15);
  height: 50px;
  width: 100%;
  background: rgba(41, 107, 47, 0.22);
  ${queries.small`
    height:50px;
    `};
`;

export const item = css`
  margin: 5px;
`;

export const langs = css`
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  width: 100px;
  height: 30px;
  font-size: large;
`;
