import { Global, css } from '@emotion/react';

const style = css`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 100 900;
    src: url('/PretendardVariable.ttf') format('truetype');
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    border: 0;
    font-style: normal;
    font-family: 'Pretendard', sans-serif;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 16px;
    margin: 1em 0;
    font-style: italic;
    color: #666;
  }

  code {
    background-color: #f6f8fa;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 0.9em;
  }

  pre {
    background-color: #f6f8fa;
    padding: 16px;
    border-radius: 6px;
    overflow: auto;
    margin-bottom: 16px;
  }

  pre code {
    background: none;
    padding: 0;
    border-radius: 0;
    font-size: inherit;
  }
`;

export const GlobalStyle = () => {
  return <Global styles={style} />;
};
