import { css } from "emotion";
import { queries } from "../../css.js";

export const container = css`
  height: calc(100vh - 52px);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(255, 255, 255, 0.15), rgba(165, 187, 203, 0.75));
`;

export const boxContainer = css`
  border: solid 1px rgba(0, 0, 0, 0.15);
  width: 40%;
  height: 40%;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.08);
  align-items: center;
  ${queries.small`
    width:100%;
    height: calc(100vh - 35px);
    `};
`;

export const header = css`
  flex: 1;
  width: 100%;
  font-family: "Sedgwick Ave Display", cursive;
  font-size: xx-large;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vh;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.08);
  color: rgba(152, 68, 0, 0.75);
`;

export const infosCont = css`
  flex: 4;
  width: 80%;
  display: flex;
  flex-direction: column;
  ${"" /* justify-content: space-around; */};
`;

export const btnCont = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 20px;
`;
export const btn = css`
  width: 100%;
  border: none;
  border-radius: 5px;
  height: 60px;
  background: rgba(0, 0, 0, 0.18);
  &:active {
    outline: none;
  }
`;

export const item = css`
  border: solid 1px red;
`;
