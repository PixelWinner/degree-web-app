import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    line-height: 1.5;
  }

  #root {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: auto;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s !important;
    box-shadow: none !important;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 2.5px;
    background: ${({ theme }) => theme.palette.grey.A700};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 2.5px;
    background: ${({ theme }) => theme.palette.primary.main};
  }
`;
