import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    color: #323232;
  }

  h1, h2, address {
    margin: 0;
  }

  h1 {
    font-size: 34px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  p {
    margin: 0;
    padding: 0;
  }
  
  button {
    padding: 11px 0;
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

  select, textarea {
    background: none;
    border: none;
    outline: none;
  }
`;
