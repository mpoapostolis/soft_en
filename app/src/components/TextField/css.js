import {css} from 'emotion';

export const input = css`
  border: none;
  font-size: medium;
  margin: 27px 0 27px 0;
  transition: 0.125s;
  color: rgba(0, 0, 0, 0.8);
  padding-bottom: 0.2em;
  background: transparent;
  border-bottom: solid 0.08em rgba(66, 133, 244, 0.55);
  width: 100%;
  &:hover {
    border-bottom: solid 0.08em rgba(66, 133, 244, 0.8);
  }
  &:focus {
    border-bottom: solid 0.1em rgb(66, 133, 244);
    outline: none;
  }
  &.error {
    border-bottom: solid 0.08em #ff0000;
  }
`;

export const hide = css`
  max-width: 20px;
  max-height: 20px;
  cursor: pointer;
`;

export const inputCont = css`
  display: inline-flex;
  align-items: center;
  position: relative;
  width: 100%;
  > .inputLabel {
    pointer-events: none;
    font-size: medium;
    position: absolute;
    color: rgba(0, 0, 0, 0.45);
    transition: all 0.15s;
    &.error {
      color: red;
    }
    &.notEmpty {
      transform: translate(-0px, -25px);
      font-size: xx-small;
    }
  }
`;
