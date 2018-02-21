import {css} from 'emotion';
import {mq} from '../../css.js';

export const container = css`
  width: 100%;
  padding-top: 56px;
`;

export const main = css`
  display: flex;
  height: calc(100vh - 166px);
`;

export const filter = css`
  height: 100px;
  width: 100;
  margin: 10px 10px 0 10px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.35);
`;

export const outCont = css`
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.35);
  margin: 10px;
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${mq.medium(css`
    width: 100%;
  `)};
  background: rgba(0, 0, 0, 0.05);
`;

export const inputCont = css`
  display: flex;
  min-height: 40px;
  justify-content: center;
  width: 95%;
  margin: 10px 0 10px 0;
  height: 30px;
`;

export const input = css`
  width: 100%;
  outline: none;
  border-radius: 5px;
  color: rgba(139, 139, 139, 1);
  transition: 0.125s;
  font-size: large;
  padding: 5px;
`;

export const activityCont = css`
  border-top: solid 1px rgba(0, 0, 0, 0.25);
  &::-webkit-scrollbar {
    width: 5px;
    border-left: solid 1px rgba(0, 0, 0, 0.1);
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #dddddd;
  }
  margin: 15px 0 10px 0;
  display: flex;
  overflow-y: auto;
  justify-content: center;
  flex-wrap: wrap;
`;

export const mapCont = css`
  width: 35%;
  margin: 10px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.35);
  ${mq.medium(css`
    display: none;
  `)};
`;
