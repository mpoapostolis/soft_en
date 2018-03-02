import { css } from "emotion";
import { mq } from "../../css.js";

export const container = css`
  width: 100%;
  height: 98%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const item = css`
  position: relative;
  width: 150px;
  margin: 5px;
`;

export const input = css`
  width: 100%;
  background: none;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  height: 30px;
  font-size: large;
  text-align: center;
  transition: 0.125s;
  color: transparent;
  text-shadow: 0 0 0 gray;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.075);
  }
`;

export const popUp = css`
  z-index: 1000;
  visibility: hidden;
  margin-top: 10px;
  border: solid 1px rgba(0, 0, 0, 0.2);
  background: white;
  position: absolute;
  transition: 0.125s;
  border-radius: 5px;
  padding: 9px;
  ${mq.medium(css`
    left: -75px;
  `)};
  &.active {
    visibility: visible;
  }
`;

export const col = css`
  display: flex;
  height: 50px;
  color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: space-around;
`;
