import {Text } from "@geist-ui/react";
import styled from "styled-components";

export const Container = styled.div`
padding: 10px 11px;
  background-color: #EBEBEB;

  div {
    background-color: #F8F8F8;
  }
`;

export const InsideGrid = styled.div`

div {
  padding: 0 5px;
  background-color: #EBEBEB;
  .collapse {
    padding: 0px 0px;
    div {
      padding: 0 0;

      h3{ padding: 0 12px; align-items: center}
      div {
        padding: 10px 0px;
        div {
          padding: 0pt 0px;
          background-color: #F8F8F8;
          div{ padding: 12px}
        }
      }
    }
  }
}
`


export const Titulo = styled(Text).attrs((props) => ({
  h6: true,
}))`
  margin: 0;
`;
