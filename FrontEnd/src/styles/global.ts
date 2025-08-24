import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Schibsted Grotesk', sans-serif;
    background-color: ${colors.background.primary};
    color: ${colors.content.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    line-height: 1.5;
    min-width: 320px;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: 'Schibsted Grotesk', sans-serif;
  }

  input, textarea {
    font-family: 'Schibsted Grotesk', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Responsividade global */
  @media (max-width: 900px) {
    body {
      font-size: 15px;
    }
    h1, h2, h3 {
      font-size: 1.2em;
    }
    .container, .main {
      padding: 8px;
    }
  }

  @media (max-width: 600px) {
    body {
      font-size: 14px;
    }
    h1, h2, h3 {
      font-size: 1em;
    }
    .container, .main {
      padding: 4px;
    }
    .hide-on-mobile {
      display: none !important;
    }
    .full-width-mobile {
      width: 100% !important;
      min-width: 0 !important;
    }
  }
`;
