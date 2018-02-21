import {css} from 'emotion';

export const container = css`
  position: fixed;
  width: 100%;
  height: 56px;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 11px 4px -10px rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

export const logo = css`
  cursor: pointer;
  width: 125px;
  margin-left: 25px;
`;

export const info = css`
  margin-right: 25px;
  display: flex;
  width: 250px;
  justify-content: flex-end;
`;

export const account = css`
  height: 100%;
  width: 250px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
  cursor: pointer;
  margin-right: 25px;
`;

export const redirect = css`
  cursor: pointer;
  margin: 10px;
  user-select: none;
  transition: all 0.15s;
  &:hover {
    border-bottom: solid 4px white;
  }
`;
