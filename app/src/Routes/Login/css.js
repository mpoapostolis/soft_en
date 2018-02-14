import {css} from 'emotion';
import {mq} from '../../css.js';

export const container = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const loginBox = css`
  align-items: center;
  width: 450px;
  height: 500px;
  padding: 30px;
  background: white;
  box-shadow: 0px 2px 5px 2px rgba(163, 163, 163, 0.5);
  img {
    width: 75px;
  }

  ${mq.large(css`
    width: 50vw;
  `)};

  ${mq.medium(css`
    width: 75vw;
  `)};
  ${mq.small(css`
    width: 100vw;
    height: 95vh;
  `)};
`;

export const item = css`
  margin: 10px;
  font-weight: 500;
  &.label {
    margin-bottom: 50px;
  }
  &.btn {
    display: flex;
    justify-content: flex-end;
  }
  p {
    margin: 0;
  }
`;

export const btn = css`
  border: none;
  background: #4285f4;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 550;
  color: white;
  width: 80px;
  height: 40px;
  border-radius: 4px;
  box-shadow: 2px 4px 10px 2px rgba(163, 163, 163, 0.4);
  cursor: pointer;
  transition: 0.125s;
  &:hover {
    filter: brightness(110%);
  }
`;

export const label = css`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
`;
