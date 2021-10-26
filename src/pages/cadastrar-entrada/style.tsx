import styled from "styled-components";

export const Section = styled.div`
    width: 85%;
    margin: 0 auto;

    h6 {
        color: #444;
        
    }
`

export const OneLineContainer = styled.div`
    border: 1px solid rgba(151, 151, 151, .45);
    padding: 1rem;
    display: flex;
    
    > form {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        span {
                margin: 0 0.5rem;
                font-size: 0.8rem;
        }

        input {
            max-width: 620px;
            width: 100%;
            height: 22px;
            border: 1px solid #eaeaea;
        }
    }
    
    @media (max-width: 830px) {
        padding: .5rem;
        flex-wrap: wrap;
    }
`
export const Inline = styled.div`
    border: 1px solid rgba(151, 151, 151, .45);
    padding: 1rem;

    > div {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 15%;

        div {
            display: flex;
            align-items: center;
        }
        span {
                margin: 0 0.5rem;
                font-size: 0.8rem;
                white-space: nowrap;
        }

        input {
            max-width: 250px;
            width: 100%;
            height: 22px;
            border: 1px solid #eaeaea;
        }
    }
    
    
    @media (max-width: 830px) {
        div {flex-wrap: wrap}
        span {white-space: normal}
    }
`

export const ModalContainer = styled.div`
    border: 1px solid rgba(151, 151, 151, .45);
    padding: 1rem;

    > div {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 15%;
        min-height: 38px;

        div {
            display: flex;
            align-items: center;
        }

        .first {
            margin: 0 0.5rem;
        }

         span {
                margin: 0 1.3rem;
                font-size: 0.8rem;
                white-space: nowrap;

                .MuiSvgIcon-root {
                            font-size: 18px
                        }

                        .Mui-checked {
                            color: #1C496A;
                            
                            
                        }
        }

        input {
            max-width: 100px;
            width: 100%;
            height: 22px;
            border: 1px solid #eaeaea;
        }
    }
    
    
    @media (max-width: 830px) {
        div {flex-wrap: wrap}
        span {white-space: normal}
    }
`





export const FormContainer = styled.div`
    border: 1px solid rgba(151, 151, 151, .45);
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    
    @media (max-width: 830px) {
        flex-wrap: wrap;
    }

`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    

    > div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        align-items: center;

        > span {
            margin: 0 0.5rem;
            font-size: 0.8rem;
            white-space: nowrap;
        }

        > input {
            max-width: 150px;
            width: 50%;
            height: 22px;
            border: 1px solid #eaeaea;
        }

        @media (max-width: 980px) {
        flex-wrap: wrap;
    }
    }
`

export const EntranceGrid = styled.div`
    margin: 0;
    box-sizing: border-box;
    overflow: auto;
    width: 85%;
    min-height: 7rem;
    
    table {
      width: 100%;
      border-spacing: 0;
      
     
      
      thead {
        display: table-header-group;
        vertical-align: middle;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-color: #1C496A;
        color: #fff;
        height: 2.5rem;
        border-radius: 5px;
        
        > tr {
          th:first-child {
                    border-top-left-radius: 5px;
                     border-bottom-left-radius: 5px;
                }
                th:last-child{
                    border-top-right-radius: 5px;
                     border-bottom-right-radius: 5px;
                }
          th {
            min-width: 45px;
            font-size: 0.75rem;
            font-weight: normal;
            text-align: left;
            letter-spacing: 0;
            padding: 0 15px;
            white-space: nowrap;
              }
            }
      }

    tbody {
        
        > tr {
            
            td:first-child {
            padding-left: 10px;
            }
            td {
            border-bottom: 1px solid #eaeaea;
            color: #444;
            height: 3rem;
            white-space: nowrap;
            padding: 0 15px;
            text-align: center;
            }
        }
            
        }

    }
`

export const BtnStyle = styled.button`
    display: flex;
    justify-content: flex-end;
    font-size: 0.67rem;
    padding: 4px;
    cursor: pointer;
`