import { css } from "emotion";
import { queries } from "../../css.js";

export const container = css`
  display: grid;
  grid-template-columns: 150px repeat(3, 1fr);
  grid-template-rows: 50px repeat(3, 1fr);
  grid-template-areas:
    ". . . ."
    "sidebar content content content"
    "sidebar content content content"
    "sidebar content content content"
    "sidebar content content content";

  ${queries.small`
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 75px 75px repeat(2, 1fr);
      grid-template-areas:
      ". . ."
      "sidebar sidebar sidebar "
      "content content content"
      "content content content";
    }
    `};
`;

export const sidebar = css`
  background-color: #7f8c8d;
  grid-area: sidebar;
  border: solid 1px black;
`;

export const content = css`
  grid-area: content;
  border: solid 1px black;
`;
