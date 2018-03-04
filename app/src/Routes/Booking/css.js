import { css } from "emotion";
import { mq } from "../../css.js";

export const container = css`
  width: 100%;
  height: calc(100vh - 56px);
  padding-top: 56px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const box = css``;

export const imageCont = css`
  width: 100vw;
  overflow-x: scroll;
  display: flex;
  justify-content: space-arround;
  max-height: 45vh;
  margin-bottom: 30px;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-left: solid 1px rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #c2c2c2;
  }
  img {
    margin: 1px;
  }
`;

export const infoCont = css`
  width: 100%;
  display: flex;
  ${mq.small(css`
    flex-direction: column;
  `)};
  justify-content: center;
`;

export const info = css`
  padding: 15px;
  color: rgba(0, 0, 0, 0.65);
  width: 30%;
  word-wrap: break-word;
  margin: 5px;
  border-radius: 5px;
  border: solid 1px rgba(0, 0, 0, 0.25);
  ${mq.small(css`
    margin-top: 100px;
    width: 90%;
  `)};

  label {
    margin-bottom: 2vh;
  }
`;

export const booking = css`
  flex-direction: column;
  height: 100%;
  padding: 15px;
  color: rgba(0, 0, 0, 0.65);
  width: 30%;
  margin: 5px;
  h1 {
    margin: 20px;
  }
  input {
    margin: 20px;
  }
  ${mq.small(css`
    width: 90%;
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

export const inputCont = css`
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const input = css`
  font-size: medium;
`;