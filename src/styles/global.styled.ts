import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

html,body{
width: 100%;
height:100%
}
body {
  font-family: Whitney,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 400;
  line-height:400px;
  text-rendering: optimizeLegibility;
  line-height: 1.15;
  background-color:green;

}



input,
button,
textarea {
  border:none;
}
a,
body,
ul,
li,
a,
p {

  color:#fff;
  margin: 0px;
  padding: 0px;
  list-style: none;
  text-align:center;
  text-decoration:none;
  
}

img {
  max-width:100%;
}

`;
