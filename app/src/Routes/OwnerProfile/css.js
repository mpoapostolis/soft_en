import { css } from "emotion";
import { mq } from "../../css.js";

export const container = css`
  width: 100%;
  height: calc(100vh - 56px);
  padding-top: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const item = css`
  border: sodid 1px red;
  width: 100%;
`;
export const balance = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0 20px 0;
`;

export const outCont = css`
  margin: 10px;
  width: 100%;
  display: flex;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.05);
  ${mq.medium(css`
    width: 100%;
  `)};
`;

export const activityCont = css`
  max-height: 80vh;
  &::-webkit-scrollbar {
    width: 5px;
    border-left: solid 1px rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #c2c2c2;
  }
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 15px 0 10px 0;
  overflow-y: auto;
  flex-wrap: wrap;
`;
