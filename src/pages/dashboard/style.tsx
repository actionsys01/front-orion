import styled from "styled-components";

export const SelectStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 25px;
  select {
    margin: 10px;
    width:125px;
    height: 35px;
}
`

export const Speedometer = styled.div`
display: flex;
align-items: flex-end;
margin: 25px;
#main-div{
  margin: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

#score-meter-1{
  width: 300px;
  height: 150px;
  border-top-left-radius: 360px;
  border-top-right-radius: 360px;
  overflow: hidden;
  position: relative;
}
#scorer-1-inner-div{
  position: absolute;
  left: 20%;
  top: 40%;
  width: 60%;
  height: 60%;
  border-top-left-radius: 360px;
  border-top-right-radius: 360px;
  background-color: #ffffff;
  z-index: 2;
}
#scorer-1-inner-div-2{
  position: absolute;
  left: 0%;
  top: 0%;
  z-index: 4;
  width: 100%;
  height: 100%;
  border-top-left-radius: 360px;
  border-top-right-radius: 360px;
  background-color: #FFCA3D;
  transform-origin: bottom center;
  transform: rotate(-130deg);
  z-index: 0;
}
#scorer-1-inner-div-3{
  position: absolute;
  right: 0%;
  top: 0%;
  z-index: 4;
  width: 100%;
  height: 100%;
  border-top-left-radius: 360px;
  border-top-right-radius: 360px;
  background-color: #0093D7;
  transform-origin: bottom center;
  transform: rotate(130deg);
  z-index: 0
}
#scorer-1-inner-div-4{
  position: absolute;
  left: 50px;
  top: -2px;
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 140px solid #A3CD3B;
  transform: rotate(180deg);
}
.scorer-1-tick {
  position: absolute;
  top: 40%;
  left: -250%;
  width: 300%;
  height: 5px;
  background-color: #000000;
  animation-name: ticker-mover-1;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  border-top-right-radius: 5%;
  border-bottom-right-radius: 5%;
}
#scorer-1-inner-div-5{
  position: absolute;
  left: 45%;
  top: 80%;
  width: 10%;
  height: 20%;
  border-radius: 50%;
  background-color: #000000;
  z-index: 2;
}
@keyframes ticker-mover-1 {
  0% {
    transform-origin: right center;
    transform: rotate(0deg);
  }
  33% {
    transform-origin: right center;
    /* transform: rotate(120deg); */
  }
  66% {
    transform-origin: right center;
    /* transform: rotate(120deg); */
  }
  100% {
    transform-origin:right center;
    /* transform: rotate(120deg); */
  }
}

`