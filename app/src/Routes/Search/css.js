import {css} from 'emotion';
import {mq} from '../../css.js';

export const container = css`
  width: 100%;
  padding-top: 56px;
`;

export const main = css`
  display: flex;
  height: calc(100vh - 126px);
`;

export const filter = css`
  height: 50px;
  width: 100;
  padding: 5px;
  margin: 10px 10px 0 10px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.35);
`;

export const outCont = css`
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.35);
  margin: 10px;
  width: 65%;
  display: flex;
  background: rgba(0, 0, 0, 0.05);
  ${mq.medium(css`
    width: 100%;
  `)};
`;

export const activityCont = css`
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
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 15px 0 10px 0;
  overflow-y: auto;
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
