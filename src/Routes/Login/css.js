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
  grid-area: box;
  border: solid 1px black;
  display: grid;
  border-radius: 5px;
`;
