import styled from "styled-components";

export const TableGrid = styled.div`
      margin: 0;
      box-sizing: border-box;
      overflow: visible;
    
    
    table {
      width: 100%;
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