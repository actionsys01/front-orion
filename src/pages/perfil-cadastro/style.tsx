import styled from "styled-components";

export const Table = styled.div`
    margin: 0;
    box-sizing: border-box;
    overflow: visible;
    width:100% ;
    
    .main {
        
        header {
            border-radius: 5px;
            border-collapse: separate;
            border-spacing: 0;
            display: flex;
            vertical-align: middle;
            background-color: #1C496A;
                span {
                    margin-left: 5%;
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    min-height: 2.5rem;

                    h5 {
                       color: #fff;
                       display : flex;
                       font-size: 0.75rem;
                       font-weight: normal;
                       align-items: center;
                       text-align: center;
                       letter-spacing: 0;
                       vertical-align: middle;
                       border-radius: 0;
                       margin: 0;
                    }
                }
        }
        .body-row {
            display: flex;
            flex-direction: column;
            div {
                color: #444;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    min-height: 3rem;
                    border-bottom: 1px solid #eaeaea;
                    align-items: center;
                   
                    .line {
                        width: 22%;
                        display: flex;
                        justify-content: center;
                        h5 {
                        font-weight: normal;
                        font-size: 0.875rem;
                        margin: 0;
                        text-align: center;
                        letter-spacing: 0;
                        vertical-align: middle;
                    }

                    }

                span {
                   
                    .icon {
                        
                        cursor: pointer;
                        font-size: 35px;
                }
                }
                
            }

            .modal {
                border: none;
                border-bottom: 1px solid #eaeaea;
                background-color: rgba(151, 151, 151, 0.05) ;

             div {
                padding: 2px 15px;
                margin-left: 12vw;
                width: 100%;
                text-align: left;
                
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                
                span {
                    display: flex;
                    align-items: center;
                    font-size: 0.775rem;
                    font-weight: normal;
                    letter-spacing: 0;
                    
                    span {
                        height: 35px;

                        .MuiSvgIcon-root {
                            font-size: 18px
                        }

                        .Mui-checked {
                            color: #1C496A;
                            
                            
                        }
                        
                    }
                }
            }
            }
        }
    }
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