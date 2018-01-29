import { css } from "emotion";

export const container = css`
  height: 100vh;
  background: black;
  flex-direction: column;
  display: flex;
  &.white {
    background: white;
  }
`;

export const headContainer = css`
  height: 75px;
`;

export const bodyContainer = css`
  height: 100%;
`;
