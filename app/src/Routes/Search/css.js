import { css } from "emotion";
import { mq } from "../../css.js";

export const container = css`
  width: 100%;
  padding-top: 56px;
`;

export const main = css`
  display: flex;
  height: calc(100vh - 130px);
`;

export const filter = css`
  height: 50px;
  width: 100;
  padding: 5px;
  margin: 10px 10px 0 10px;
  border: solid 1px #00000026;
`;

export const outCont = css`
  margin: 10px;
  width: 65%;
  display: flex;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.05);
  ${mq.medium(css`
    width: 100%;
  `)};
`;

export const activityCont = css`
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

export const mapCont = css`
  width: 35%;
  margin: 10px;
  border: solid 1px #00000026;
  ${mq.medium(css`
    display: none;
  `)};
`;
