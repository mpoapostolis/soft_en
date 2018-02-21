import { css } from "emotion";
import { mq } from "../../css.js";

export const container = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const loginBox = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30vw;
  height: 50vh;
  border: solid 1px #2e2d2d;
  background: black;
  ${mq.large(css`
    width: 50vw;
  `)};

  ${mq.medium(css`
    width: 75vw;
  `)};
  ${mq.small(css`
    width: 100vw;
  `)};
`;

export const logReg = css`
  border: sold 1px white;
  width: 100%;
  height: 60px;
  cursor: pointer;
  display: flex;
  color: white;
`;

export const choice = css`
  display: flex;
  height: 100%;
  width: 100%;
  font-weight: 500;
  font-size: xx-large;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  &.active {
    background: black;
  }
`;

export const textCont = css`
  width: 80%;
  height: 70px;
  color: white;
`;

export const passwordClass = css`
  display: flex;
  width: 80%;
  color: white;
`;

export const btn = css`
  width: 80%;
  background: #009be2;
  border: none;
  color: white;
  height: 45px;
  font-weight: 600;
  font-size: large;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: all 0.25s;
  &:hover {
    background: #00aaf7;
  }
`;
export const errorClass = css`
  color: rgb(255, 45, 45);
  width: 80%;
  margin-top: 1em;
  text-align: center;
  font-weight: 600;
`;

export const input = css`
  font-size: large;
  color: white;
`;
