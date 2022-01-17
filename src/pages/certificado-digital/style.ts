import styled from "styled-components";

export const Section = styled.div`
    width: 85%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
        display: flex;
        width: 100%;
        border: 1px solid rgba(151, 151, 151, .45);
        padding: 1.4rem;
        background-color: rgba(196, 196, 196, .09);

        div {
            width: 100%;
            display: flex;
            flex-direction: column;
        }
    }

    @media (max-width: 1075px) {
        > div {
            flex-direction: column;
        }
    }
`

export const InputStyle = styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        span {
                margin: 0 0.5rem;
                font-size: 0.8rem;
                white-space: nowrap;
        }

        input {
            max-width: 450px;
            width: 100%;
            height: 28px;
            border: 1px solid #eaeaea;
        }
`

export const InlineInputs = styled.div`
    margin-top: 0.8rem;
    width: 76% !important;

    > span {
        margin: 0 0.5rem;
        font-size: 0.8rem;
        white-space: nowrap;
    }

       > div {
        display: flex;
        flex-direction: row !important;
        align-items: center;
        background-color: #fff;
        height: 10px;
        
        padding: 1.8rem;

            span {
                        margin: 0 0.5rem;
                        font-size: 0.8rem;
                        white-space: nowrap;
                }

                input {
                    max-width: 150px;
                    width: 100%;
                    height: 28px;
                    border: 1px solid #eaeaea;
                    text-align: center;
                    /* padding-inline-start: .425rem; */
                }
    }    
`

export const RightInput = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 75% !important;

        > span {
                margin: 0 0.5rem;
                font-size: 0.8rem;
                white-space: nowrap;
        }

        > div {
            max-width: 200px;
            width: 100%;
            height: 88px;
            border: 1px solid #eaeaea;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;

            .confirm {
              max-width: 170px;
              width: 100%;
              height: 64px;
              border: 1px solid #0DD0B3;
              background-color: #0DD0B3;
          }
        }
`

export const UploadModal = styled.div`
    z-index: auto;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.22);
    box-sizing: border-box;

    >  div {
        width: 53%;
        height: 48%;
        min-height: 250px;
        border: none;
        position: absolute;
        left: 31%;
        top: 30%;
        background-color: #fff;


        > span {
            position: absolute;
            left: 0.6rem;
            top: 0.2rem;

                svg {
                    height: 36px;
                    width: 28px;
                    cursor: pointer;
                }
        }

        h4 {
            font-size: 1.25rem; 
            font-weight: 600;
            margin: 14px auto;
            vertical-align: middle;
            text-align: center ;
            color: #444;
        }

        form {
            padding: 0 3rem;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            flex-direction: column;
               
        }
    }
        @media (max-width: 495px) {
            min-height: 275px;
        }

        @media (max-width: 575px) {
            > div {
                left: 20%!IMPORTANT;
                h4 {
                    font-size: 1rem;
                }
            }
        }
        @media (max-width: 820px) {
        
            > div {
                min-height: 475px;
                top: 10%;
                left: 38%;
            }
        }
`


export const ModalContent = styled.div`
    display: flex;
    justify-content: center;
    /* margin: 0 2rem;  */
    box-sizing: border-box;
    gap: 100px;

    @media (max-width: 820px) {
        flex-direction: column;
        gap: 35px;
        
    }
`

export const IconContainer = styled.div`
    box-sizing: border-box;
    label {             
            display: flex;
            flex-direction: column;
            border-radius: 5px;
            border: none;
            width: 100%;
            display: flex;
            justify-content: center;
            /* align-items: center; */
            cursor: pointer;

            span {
                white-space: pre!IMPORTANT;
                padding-top: .1rem;
                max-width: 130px;
                text-align: center;
            }

            svg {
            padding: 5px 2px;
            width: 160px;
            height: 135px;
            stroke-width: .7px;
            }
    }
            input {
                display: none;
                cursor: pointer;
            }
`
export const InputsContainer = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;

    span {
        margin: 0 0.5rem;
        font-size: 0.8rem;
        white-space: nowrap;
    }

    input {
            max-width: 250px;
            width: 85%;
            height: 32px;
            border: 1px solid #eaeaea;
        }

         input[type= "date" ] {
            min-width: 160px;
            text-align: center;
            font-size: 14px;
            width: 80%;
            height: 32px;
            border: 1px solid #eaeaea;
            padding-inline-start: .225rem;
        }
        @media (max-width: 1060px) {
        > div { 
            input {
            max-width: 150px;
            }
            input[type= "date" ] {
                min-width: 120px;
                width: 55%;
                padding-inline: 0;
                font-size: 10px;
                
            }
            }
    }
        @media (max-width: 820px) {
        
        flex-direction: column;
        > div { 
            input {
            max-width: 150px;
            }
            input[type= "date" ] {
                min-width: 120px;
                width: 55%;
                padding-inline: 0;
                font-size: 10px;

            }
            }
    }
`

export const InsideModal = styled.div`
    display: flex;
    justify-content: center;
    color: #444;
    box-sizing: border-box;

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 1rem;
        align-items: center;

        span {
            margin: 0 0.5rem;
            font-size: 0.8rem;
            white-space: nowrap;
        }

         input {
            max-width: 250px;
            width: 85%;
            height: 32px;
            border: 1px solid #eaeaea;
        }

         input[type= "date" ] {
            min-width: 160px;
            text-align: center;
            font-size: 14px;
            width: 80%;
            height: 32px;
            border: 1px solid #eaeaea;
            padding-inline-start: .225rem;
        }
   
    }
        @media (max-width: 1060px) {
        > div { 
            input {
            max-width: 150px;
            }
            input[type= "date" ] {
                min-width: 120px;
                width: 55%;
                padding-inline: 0;
                font-size: 10px;
                
            }
            }
    }
        @media (max-width: 820px) {
        
        flex-direction: column;
        > div { 
            input {
            max-width: 150px;
            }
            input[type= "date" ] {
                min-width: 120px;
                width: 55%;
                padding-inline: 0;
                font-size: 10px;

            }
            }
    }
    
`

export const ProgressBarStyle = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;

            > div {
                border-radius: 5px;
                border: 1px solid #eaeaea;
                height: 24px;
                width: 55%;
                background-color: #d8d8d8;
                display: flex;
                align-items: center;

                div {
                    background-color: #1C496A;
                    opacity: 0;
                    border-radius: 5px;
                    height: 20px;
                    transition: ease-in 0.8s;
                }
            }
            button {
                    cursor: pointer;
                }
`

export const BtnRow = styled.div`
    margin: 1rem;
    display: flex;
    position: relative;
    box-sizing: border-box;
    margin-left: calc(0 * 16pt / 2 );
    margin-right: calc(0 * 16pt / 2 );
    margin-bottom: 10px;
    justify-content: space-evenly;
    align-items: center;

    button {
        box-sizing: border-box;
        display: inline-block;
        padding: 0 1.25rem;
        height: 2rem;
        min-width: 13.375rem;
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
        cursor: pointer;
        pointer-events: auto;
        box-shadow: none;
    }

        button:first-child {
            background-color: #B11A27;
            border: 1px solid #B11A27; 
        }

        button:last-child {
            background-color: #0DD0B3;
            border: 1px solid #0DD0B3;
        }

        span {
            display: flex;
            position: absolute;
            top: 8px;
            
            svg {
                display: flex;
                align-items: center;
                height: 15px;
                width: 15px;
            }
        }
    
`

export const SecondBtn = styled.button` 
        background-color: #1C496A!IMPORTANT;
        color: #fff!IMPORTANT;
`