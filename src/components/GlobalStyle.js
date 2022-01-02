import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Quicksand", sans-serif;
  }
  h1,
  h2,
  h4 {
    color: #04293f;
  }
  h3,
  h5 {
    color: #04293f;
    opacity: 75%;
  }
`;
export default GlobalStyle;
