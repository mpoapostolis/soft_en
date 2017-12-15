import { css } from "emotion";
import { queries } from "../../css.js";

export const container = css`
  user-select: none;
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: 1fr 8fr 1fr;
  grid-template-areas:
    " . . .  "
    " . box . "
    " . . . ";
  ${queries.small`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "box";
  `};
`;

export const box = css`
  overflow: hidden;
  border: solid 1px black;
  grid-area: box;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 275px repeat(2, 1fr);
  grid-template-areas:
    "info form form"
    "info form form"
    "info form form"
    "info form form"
    "info form form";

  ${queries.small`
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "form form"
      "form form"
      "form form"
      "form form"
      "form form";
  `};
`;

export const info = css`
  background: #ffd500;
  grid-area: info;
  ${queries.medium`
    display: none;
  `};
`;

export const form = css`
  border: solid 1px black;
  grid-area: form;
  display: grid;
`;

export const item = css`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: xx-large;
  font-weight: 600;
  cursor: pointer;
  padding: 20px;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  &.active {
    background: transparent;
    color: white;
  }
  ${queries.small`
    font-size: large;
  `};
`;
