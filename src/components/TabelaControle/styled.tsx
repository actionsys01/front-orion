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
        text-transform: capitalize;
        white-space: nowrap;
      }
    }

    td,
    th {
      &:nth-child(7),
      &:nth-child(8),
      &:nth-child(9),
      &:nth-child(10),
      &:nth-child(11) {
        & .cell,
        & .thead-box {
          justify-content: center;
          text-align: center;
          white-space: normal;
          width: 70px;
        }
      }
    }
  }
`;
