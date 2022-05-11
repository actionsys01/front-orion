import styled from 'styled-components';
import { Grid as GridGeist } from '@geist-ui/react';

export const Grid = styled(GridGeist)`
  overflow: auto;
  max-height: auto;
  min-height: 26rem;
  table {
    th {
      background-color: ${props => props.theme.palette.foreground};
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
      &:nth-child(8) {
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
export const Pages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  ul li::before {
    display: none;
  }
  .MuiPaginationItem-root {
    color: #0dd0b3;
  }
  .MuiPaginationItem-page.Mui-selected {
    background-color: #0dd0b3;
    color: white;
  }
`;
