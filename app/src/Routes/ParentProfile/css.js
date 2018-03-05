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
`;

export const item = css`
  border: sodid 1px red;
  width: 100%;
`;
export const balance = css`
  text-align: center;
  width: 100%;
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

export const input = css`
  margin: 10px !important;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 10px;
  width: 95%;
`;

export const booking = css`
  text-align: center;
  flex-direction: column;
  height: 100%;
  padding: 15px;
  color: rgba(0, 0, 0, 0.65);
  width: 90vw;
  margin-left: 5vw;
  h1 {
    margin: 20px;
  }
  input {
    margin: 20px;
  }
  ${mq.small(css`
    width: 100%;
    margin-left: 0;
  `)};

  border-radius: 5px;
  border: solid 1px rgba(0, 0, 0, 0.25);
`;

export const btn = css`
  margin: 10px !important;
  height: 50px !important;
  width: 95% !important;
  font-size: large !important;
  font-weight: 900 !important;
  background: #ff5a5f !important;
  color: white !important;
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
