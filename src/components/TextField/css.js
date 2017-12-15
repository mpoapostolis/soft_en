import { css } from "emotion";

export const input = css`
  border: none;
  font-size: medium;
  margin: 27px 0 27px 0;
  transition: 0.125s;
  color: rgba(0, 0, 0, 0.8);
  padding-bottom: 0.5em;
  width: 100%;
  border-bottom: solid 0.08em rgba(0, 0, 0, 0.4);
  &:hover {
    border-bottom: solid 0.08em rgba(0, 0, 0, 0.8);
  }
  &:focus {
    border-bottom: solid 0.08em #008bcc;
    outline: none;
  }
  &.error {
    border-bottom: solid 0.08em #ff0000;
  }
`;

export const inputCont = css`
  display: inline-flex;
  align-items: center;
  position: relative;
  width: 75%;
  > .inputLabel {
    pointer-events: none;
    font-size: large;
    position: absolute;
    color: rgba(0, 0, 0, 0.45);
    transition: all 0.15s;
    &.notEmpty {
      transform: translate(-0px, -25px);
      font-size: xx-small;
    }
  }
`;
