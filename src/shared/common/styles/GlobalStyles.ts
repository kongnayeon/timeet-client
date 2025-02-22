import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const GlobalStyle = css`
  ${emotionReset}

  html {
    font-size: 62.5%;
  }

  body {
    position: relative;
    height: 100%;
    min-height: 100dvh;
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      min-height: -webkit-fill-available;
      scroll: smooth;
    }

    font-family: 'Pretendard';
    background-color: gray;
  }

  div {
    box-sizing: border-box;
  }

  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: visible;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  button:focus {
    outline: none;
  }
  button:disabled {
    pointer-events: none;
  }
  input:focus {
    outline: none;
  }
  textarea:focus {
    outline: none;
  }
  input,
  textarea {
    border: none;
    margin: 0;
    box-sizing: border-box;
  }
`;
