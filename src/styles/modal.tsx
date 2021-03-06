import styled from "styled-components";

export const Modal = styled.div`
z-index: 1000;
display: block;
position: fixed;
top: 0;
left: 0;
height: 100vh;
width:100vw;
background: rgba(0,0,0,0.20);

>  div {
width: 33%;
height: 30%;
border: none;
position: absolute;
left: 40%;
top: 30%;
background-color: #fff;
padding: 1rem 2rem;
box-sizing: border-box;

h5 {
  font-size: 1rem; 
  /* letter-spacing: 0.11rem; */
  font-weight: 600;
  margin: 20px auto;
  vertical-align: middle;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}

div {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 3.625rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #eaeaea;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

>  button {
      font-size: 0.75rem;
      border: none;
      color: #1C496A;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
      border-radius: 0;
      min-width: 0;
      background-color: #fff;
      cursor: pointer;
}

button:last-child{
  border-left: 1px solid #eaeaea;
}

}
}
`