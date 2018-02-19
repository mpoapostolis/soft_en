import { css } from "emotion";
import { mq } from "../../css.js";

export const container = css`
  width: 100%;
  height: calc(100vh);
  display: flex;
  justify-content: center;
  background: white;
`;

export const mainCont = css`
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mq.small(css`
    height: 100vh;
  `)};
`;

export const inputCont = css`
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 75%;
  background: rgba(0, 0, 0, 0.55);
  ${mq.small(css`
    background: none;
    align-items: center;
    flex-direction: column;
  `)};
`;

export const logo = css`
  width: 300px;
  margin: 20px;
  ${mq.small(css`
    margin: 0px;
  `)};
`;

export const item = css`
  color: #000000bf;
  font-weight:600;
  border: 1px solid grey;
  text-align: center;
  width: 100%;
  border-radius: 5px;
  height: 40px;
  font-size: large;
  margin-right: 10px;
  ${mq.small(css`
    width: 80%;
    margin: 15px;
  `)};
`;

export const btn= css`
  color: #000000bf !important;
`