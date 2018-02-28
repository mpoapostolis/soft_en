import {css} from 'emotion';
import {mq} from '../../css.js';

export const container = css`
  width: 100%;
  height: 98%;
  display: flex;
  align-items: center;
`;

export const button = css`
  width: 120px;
  margin: 5px;
  background: none;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  height: 30px;
  transition: 0.125s;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.075);
  }
`;
