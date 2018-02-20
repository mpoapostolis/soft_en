import {css} from 'emotion';
import {mq} from '../../css.js';

export const container = css`
  width: 100vw;
  font-family: 'Source Sans Pro', sans-serif;
  background: url('/images/bg.svg');
  background-size: cover;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
  ${mq.small(css`
    padding-top: 100px;
  `)};
`;

export const item = css`
  margin: 5px;
  font-weight: 500;
  p {
    margin: 0;
  }
`;

export const loginBox = css`
  align-items: center;
  width: 450px;
  height: 550px;
  padding: 15px 0 15px 0;
  background: white;
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

export const header = css`
  width: calc(100%-60px);
  padding: 15px 30px 15px 30px;
  img {
    width: 120px;
  }
`;

export const loginBody = css`
  height: 350px;
  width: calc(100%-60px);
  padding: 0 30px 0 30px;
  overflow-y: auto;
  &.shadow {
  }
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
`;

export const footer = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
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
