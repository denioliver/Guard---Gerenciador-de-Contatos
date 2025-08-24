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
`;
