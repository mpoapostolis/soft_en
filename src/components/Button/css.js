import { css } from "emotion";
import { queries } from "../../css.js";

export const btnContainer = css`
  background: #4285f4;
  border: 1px solid #4285f4;
  min-width: 88px;
  color: white;
  font-weight: 600;
  outline: none;
  font-size: large;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  cursor: pointer;
  &:hover {
    filter: brightness(1.05) drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.35));
  }
`;
