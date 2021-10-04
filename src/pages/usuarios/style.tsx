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

export const GridStyle = styled.div`
    margin: 0;
    box-sizing: border-box;
    overflow: visible;
    
    
    table {
      width:100%;
      border-spacing: 0;
      border-radius: 5px;
     
      
      thead {
        display: table-header-group;
        vertical-align: middle;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-color: #1C496A;
        color: #fff;
        height: 2.5rem;
        
        tr {
          th:first-child {
                    border-top-left-radius: 5px;
                     border-bottom-left-radius: 5px;
                }
                th:last-child{
                    border-top-right-radius: 5px;
                     border-bottom-right-radius: 5px;
                }
          th {
            width: 0%;
            font-size: 0.75rem;
            font-weight: normal;
            text-align: left;
            letter-spacing: 0;
            
              }
            }
      }


      tbody {
           
        tr {
          td:first-child {
            padding-left: 10px;
          }
          td {
            border-bottom: 1px solid #eaeaea;
            color: #444;
            height: 3rem;
          }
        }
            
      }
    }
`
