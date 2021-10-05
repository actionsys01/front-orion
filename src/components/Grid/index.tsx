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
    th {
      & .cell,
      & .thead-box {
        
        text-transform: capitalize;
        white-space: nowrap;
      }
    }
  }

  td,
  th {
    &:nth-child(1),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
      & .cell,
      & .thead-box {
        white-space: nowrap;
      }
    }
  }
`;
