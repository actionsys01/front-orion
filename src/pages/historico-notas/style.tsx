import styled from "styled-components";

export const Wrapper = styled.div`
    margin: 0;
    box-sizing: border-box;
    overflow: visible;

    table {
        width: 100%;
        
        border-spacing: 0;
        thead{
            display: table-header-group;
            vertical-align: middle;
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
            font-size: 0.75rem;
            font-weight: normal;
            letter-spacing: 0;
            text-align: center;
              }
            }
        }

        tbody {
           
           tr {
            
             td {
               border-bottom: 1px solid #eaeaea;
               color: #444;
               height: 3rem;
               text-align: center;
             }
           }
               
         }
    }
`