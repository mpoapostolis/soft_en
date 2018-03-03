import { css } from "emotion";
import { mq } from "../../css.js";

export const container = css`
  width: 100%;
  height: calc(100vh - 56px);
  padding-top: 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const item = css`
  border: sodid 1px red;
  width: 100%;
`;

export const balanceCont = css`
  margin: 20px 0 20px 0;
`;
