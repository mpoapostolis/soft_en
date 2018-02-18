import { css } from "emotion";

export const container = css`
  position: fixed;
  width: 100%;
  height: 56px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 11px 4px -10px rgba(0, 0, 0, 0.18);
`;

export const logo = css`
  width: 125px;
  margin-left: 25px;
`;

export const info = css`
  margin-right: 25px;
  display: flex;
  border: solid 1px red;
  width: 250px;
  justify-content: space-around;
`;

export const redirect = css`
  cursor: pointer;
  user-select: none;
`;
