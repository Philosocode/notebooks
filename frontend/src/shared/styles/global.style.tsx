import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
// import { theme } from "shared/styles/theme.styles";

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  :root {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /* 1rem = 10px, 10/16 = 62.5% */
    font-family: "Avenir Next", "Open Sans", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    font-size: 1.6rem;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  /* https://tailwindcss.com/docs/preflight */
  blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
  }

  ul, ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  svg, video, canvas, audio, iframe, embed, object {
    display: block;
  }

  button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }

  /* Modal Styles */
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 150ms ease-in-out;

    &--after-open { opacity: 1; }
    &--before-close { opacity: 0; }
  }
`;
