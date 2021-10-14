import styled from "styled-components";

export const AccountStyle = styled.div`
    
`

export const ButtonStyle = styled.div`
    width: 100%;
    margin: 0;
    display: flex;
    height: 2.5rem;
    line-height: 2.5rem;
    font-weight: 400;
    font-size: 0.875rem;
    user-select: none;
    outline: none;
    text-transform: capitalize;
    justify-content: flex-end;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    color: #fff;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: none;

    button /* com texto ou icone */ {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        text-align: center;
        top: -1px;
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
          }
        }
            
      }
    }
`