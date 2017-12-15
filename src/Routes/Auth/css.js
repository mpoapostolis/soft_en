import { css } from "emotion";
export const container = css`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 150px repeat(3, 1fr);
  grid-template-rows: 75px repeat(3, 1fr);
  grid-template-areas:
    "sidebar header header header"
    "sidebar content content content"
    "sidebar content content content"
    "sidebar content content content"
    "sidebar content content content";

  @media (max-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100px 100px repeat(2, 1fr);
    grid-template-areas:
      "header header header"
      "sidebar sidebar sidebar "
      "content content content"
      "content content content";
  }
`;

export const header = css`
  background: #dddddd;
  grid-area: header;
  border: solid 1px black;
`;

export const sidebar = css`
  background-color: #7f8c8d;
  grid-area: sidebar;
  border: solid 1px black;
`;

export const content = css`
  background-color: #2c3e50;
  grid-area: content;
  border: solid 1px black;
`;
