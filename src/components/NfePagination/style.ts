<<<<<<< Updated upstream
import styled from 'styled-components';

export const Container = styled.div`

    display: flex;
    flex: 1;
    flex-direction: column;

    display: flex;
    width: 100%;
    /* border: 1px solid red; */
    /* background: black; */

        table{
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            color : #969cb3;
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background:  #f1f1f1;
            color: #969cb3;
            border-radius: 0.25rem;

            &:first-child{
                color: #363f5f;
            }

=======
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
>>>>>>> Stashed changes
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
    color: #0DD0B3
}
.MuiPaginationItem-page.Mui-selected {
    background-color: #0DD0B3;
    color: white
}

`
