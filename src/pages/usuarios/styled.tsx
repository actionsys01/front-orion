import styled from "styled-components";
import { Grid as GridGeist } from "@geist-ui/react";


export const Grid = styled(GridGeist)`
  overflow: auto;
  max-height: auto;
  table {
    th {
      background-color: ${(props) => props.theme.palette.foreground};
      color: #fff;
    }
    td,
    th {
      & .cell,
      & .thead-box {
        justify-content: right;
        text-align: right;
        text-transform: capitalize;
        white-space: nowrap;
      }
    }

    td,
    th {
      &:nth-child(7),
      &:nth-child(8)
      {
        & .cell,
        & .thead-box {
          justify-content: center;
          text-align: center;
          white-space: normal;
          width: 70px;
        }
    }}}
`