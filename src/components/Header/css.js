import { css } from "emotion";
import { queries } from "../../css.js";

export const container = css`
  user-select: none;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.15);
  height: 50px;
  width: 100%;
  background: rgb(245, 245, 245);
  ${queries.small`
    height: 50px;
    justify-content: flex-end;
    `};
`;

export const item = css`
  margin: 5px;
  cursor: pointer;
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
  height: 20px;
  font-size: large;
`;

export const img = css`
  height: 20px;
`;

export const left = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: xx-large;
  font-weight: 600;
  font-family: "Sedgwick Ave Display", cursive;
  margin-left: 25px;
  cursor: pointer;
  color: rgba(152, 68, 0, 0.61);
  transition: all 0.25s;
  ${queries.small`
    display:none;
    `};
`;

export const right = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
