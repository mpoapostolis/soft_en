import {css} from 'emotion';
import {mq} from '../../css.js';

export const container = css`
  width: 100%;
  padding-top: 75px;
  height: calc(100vh);
  display: flex;
  background: white;
`;

export const box = css`
  width: 250px;
  height: 350px;
  border: solid 1px red;
  margin: 20px;
`;

export const activitiesCont = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  border: solid 1px black;
  ${mq.medium(css`
    justify-content: center;
  `)};
`;

export const mapCont = css`
  width: 100%;
  ${mq.medium(css`
    display: none;
  `)};

  border: solid 1px black;
`;
