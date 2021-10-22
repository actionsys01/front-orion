import styled from "styled-components";

export const AccountStyle = styled.div`
    
`

export const ButtonStyle = styled.div`
    display: flex;
    position: relative;
    box-sizing: border-box;
    margin-left: calc(0 * 16pt / 2 );
    margin-right: calc(0 * 16pt / 2 );
    margin-bottom: 10px;
    row-gap: calc(0 * 16pt);
    justify-content: flex-end;
    align-items: center;

    button {
        box-sizing: border-box;
        display: inline-block;
        padding: 0 1.25rem;
        height: 2rem;
        min-width: 9.375rem;
        width: initial;
        border-radius: 5px;
        font-weight: 400;
        font-size: 0.875rem;
        user-select: none;
        outline: none;
        text-transform: capitalize;
        justify-content: center;
        text-align: center;
        white-space: nowrap;
        transition: background-color 200ms ease 0ms,box-shadow 200ms ease 0ms, border 200ms ease 0ms,color 200ms ease 0ms;
        position: relative;
        overflow: hidden;
        color: #fff;
        background-color: #0DD0B3;
        border: 1px solid #0DD0B3;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: none;
    }
`

export const AccountGrid = styled.div`
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
            white-space: nowrap;
          }
        }
            
      }
    }
`