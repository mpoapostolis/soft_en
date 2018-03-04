import { css } from "emotion";
import { mq } from "../../css.js";

export const container = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const item = css`
  display: flex;
  flex-direction: column;
`;

export const loginBox = css`
  align-items: center;
  width: 750px;
  height: 550px;
  padding: 15px 0 15px 0;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 2px 2px 2px rgba(163, 163, 163, 0.5);
  ${mq.large(css`
    width: 50vw;
  `)};

  ${mq.medium(css`
    width: 75vw;
  `)};
  ${mq.small(css`
    width: 100vw;
    height: 100vh;
  `)};
`;
