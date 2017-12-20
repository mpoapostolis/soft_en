import { css } from "emotion";

export const container = css`
  height: 100%;
  width: 95%;
`;

export const pointer = css`
  cursor: pointer;
`;

export const col = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6vh;
  &.info {
    height: 8vh;
  }
  &.head {
    background-color: #f9f9f9;
  }
  &.error {
    border: none;
    justify-content: center;
  }

  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  &:last-child {
    border: none;
    user-select: none;
  }
`;

export const exportFile = css`
  cursor: pointer;
`;

export const item = css`
  padding: 10px;
  display: flex;
  align-items: center;
  color: #4a4a4a;
  width: 100%;
  &.flames {
    justify-content: flex-start;
  }
  &.footer {
    justify-content: flex-end;
  }
`;

export const infoItem = css`
  display: flex;
  width: 40%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  &:first-child {
    padding-left: 5px;
    justify-content: flex-start;
    width: 100%;
    color: #999999;
  }
`;

export const filter = css`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  color: #999999;
  justify-content: center;
`;

export const select = css`
  border: none;
  height: 20px;
  text-align: center;
  margin-left: 5px;
  margin-right: 15px;
  border-radius: 3px;
  background: none;
  font-size: 15px;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

export const entriesClass = css`
  margin: 0 5px 0 5px;
  color: #333333;
`;

export const p = css`
  color: #999999;
`;

export const msg = css`
  font-weight: 600;
  color: #9c0505;
`;

export const statusClass = css`
  padding: 4px;
  font-size: medium;
  font-weight: 600;
  border-radius: 3px;
  color: white;
  &.active {
    background: #1ab188;
  }
  &.completed {
    background: #c1c1c1;
  }
  &.scheduled{
    background: #e9bb47;
  }
  &.expired {
    background: #6b6b6b;
  }
  &.edit {
    font-weight: 400;
    cursor: pointer;
    user-select: none;
    color: #008bcc;
  }
  &.noActive {
    cursor: not-allowed;
    color: rgba(121, 121, 121, 0.35);
  }
`;
