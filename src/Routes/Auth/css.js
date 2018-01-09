import { css } from "emotion";
import { queries } from "../../css.js";

export const container = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px repeat(3, 1fr);
  grid-template-areas:
    ". . ."
    "content content content"
    "content content content"
    "content content content"
    "content content content";

  ${queries.small`
      grid-template-columns: 50px repeat(2, 1fr);
      grid-template-rows: 50px repeat(3, 1fr);
      grid-template-areas:
      ". . ."
      "content content content"
      "content content content"
      "content content content";
    }
    `};
`;

export const content = css`
  grid-area: content;
`;
