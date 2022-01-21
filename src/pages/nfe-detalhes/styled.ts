import { Grid, Text } from "@geist-ui/react";
import styled from "styled-components";

export const GridAlinhaTextoCentro = styled(Grid)`
  text-align: center;
`;

export const Menu = styled.div`


  .style{
    header {
      height:37.3px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      vertical-align: middle;
      background-color: #21232E;

      div {
        color: #1AD4FF;
      }
       .active{
        
        background-color: #fff;
        padding: 8.7px;
        padding-inline: 30px;
      }
      .active::after {
        display: none;
      }
    }

    div {
      



    }

  }
`

export const Container = styled.div`
  padding: 10px;
`;
export const Titulo = styled(Text).attrs((props) => ({
  h6: true,
}))`margin: 0`;
    
 

    export const TopNfeMenu = styled.div`
        height: 37.3px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        vertical-align: middle;
        background-color: #21232E;

    ul {
        color: #1AD4FF;
        display: flex;
        gap: 1.7rem;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        margin: 0;
        padding: 0 55px;

      li {
            white-space: nowrap;
            cursor: pointer;
            margin: 0;
            padding: 0;
        /* align-items: center;
        display: flex; */
          /* list-style-type: none; */
      }
    }

    ul li::before {
        display: none;
    }
    .active{
      
      background-color: #fff;
      padding: 6.7px;
      padding-inline: 15px;
    }
    .active::after {
      display: none;
    }
` 

