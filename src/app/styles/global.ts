import { createGlobalStyle } from 'styled-components';
import type {Theme} from "./theme.ts";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${({ theme }: {theme: Theme}) => theme.typography.fontFamily};
    color: ${({ theme }: {theme: Theme}) => theme.colors.text.primary};
    background-color: ${({ theme }: {theme: Theme}) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  ul, ol {
    list-style: none;
  }
`;