import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #323232;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  h1 {
    font-size: 34px;
  }

  a {
    color:inherit;
    text-decoration: none;
  }

  li {
    list-style: none;
  }
  
  button {
    padding: 11px;
    border: none;
    border-radius: 3px;
    background: #00c7ae;
    color: #fff;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      filter: brightness(90%);
    }
  }
`;
