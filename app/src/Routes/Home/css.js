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
  height: 600px;
  background: url("https://a0.muscache.com/airbnb/growth/magic_carpet/hero4_large.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const boxCont = css`
  display: flex;
  flex-direction: column;
  align-items: Center;
  justify-content: space-around;
  padding: 30px;
  height: 400px;
  width: 45vw;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 5px;
  color: #ffffffbf;
  ${mq.small(css`
    width: 80%;
    background: none;
    align-items: center;
  `)};
`;

export const inputCont = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const title = css`
  font-size: xx-large;
  color: #ffffffbf;
  font-weight: 900;
`;

export const item = css`
  font-weight: 600;
  margin: 20px;
  border: 1px solid #0000001f;
  text-align: center;
  border-radius: 5px;
  height: 40px;
  font-size: large;
  width: 75%;
  ${mq.small(css`
    width: 80%;
    margin: 15px;
  `)};
`;

export const btn = css`
  margin: 10px !important;
  height: 50px !important;
  width: 75% !important;
  font-size: large !important;
  font-weight: 900 !important;
  background: #ff5a5f !important;
  color: white !important;
`;
