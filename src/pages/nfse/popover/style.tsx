import styled from "styled-components";

export const PopStyle = styled.div`
    position: relative;
    cursor: pointer;
    
    > div {
        clip-path: polygon(20% 0, 100% 0%, 100% 75%, 20% 75%, 20% 43%, 13% 38%, 20% 33%);
        position: absolute;
        width: -webkit-fill-available;
        min-width: 135px;
        height: fit-content;
        min-height: 140px;
        bottom: -4.865rem;
        left: 24.89825px;
        background-color: #fff;
        color: #1c496a;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
        border: none;
        box-sizing: border-box;
        padding: 8pt;
        text-align: center;
    }
    div /* primeira div */ {
    position: absolute;
    width: -webkit-fill-available;
    min-width: 135px;
    height: fit-content;
    min-height: 90px;
    bottom: -2.865rem;
    left: 24.89825px;
    background-color: #fff;
    color: #1c496a;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
    border: none;
    box-sizing: border-box;
    padding: 8pt;
    text-align: center;
    
        p { 
            cursor: pointer;
            margin: 0;
            font-size: 0.875rem;
            line-height: 2rem;
        }

    /* div {
        clip-path: polygon(20% 0, 100% 0%, 100% 75%, 20% 75%, 20% 43%, 13% 38%, 20% 33%);
    } */
}
`

export const PopBackground = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;