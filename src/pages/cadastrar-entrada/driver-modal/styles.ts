import styled from "styled-components";

export const ModalStyle = styled.div`
    z-index: 1000;
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
        height: 50%;
        min-height: 250px;
        border: none;
        position: absolute;
        left: 31%;
        top: 20%;
        background-color: #fff;
        box-sizing: border-box;

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
            font-weight: 600;
            margin: 14px auto;
            vertical-align: middle;
            text-align: center ;
            color: #444;
        }
    }

    @media (max-width: 810px) {
        > div {
            width: 65%;
            left: 15%;
            h4 {
                font-size: .9rem;
                margin: 32px auto;
            }
        }
    }

    @media (max-width: 975px) {
        > div {
            h4 {
                margin: 32px auto;
            }
        }
    }
`

export const Section = styled.div`
    display: flex;
    align-items: center;
    height: 70%;
    box-sizing: border-box;
    
    form {
        margin: 0 auto;
        padding: 2rem ;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid #eaeaea;
    }

    @media (max-width: 1110px) {
        height: 40%;
       form {
           padding: .2rem 0;
           box-sizing: border-box;
           border: none;
           
       }
    }

    /* @media (max-width: 810px) {
        form {
            align-items: normal;
        }
    } */
`

export const InputStyles = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: .3rem;
   
    div {
        width: 75%;
        display: flex;
        justify-content: flex-start;
    }
    span {
            margin: 0 0.5rem;
            font-size: 0.8rem;
    }

    input {
            max-width: 450px;
            width: 100%;
            height: 28px;
            border: 1px solid #eaeaea;
            padding-inline-start: .625rem;
        }
   

        @media (max-width: 930px) {
        padding: .3rem;
        width: 70%;
        flex-wrap: wrap;
            div {
                width: 100%;
                justify-content: center;
            }
            input{
                min-width: fit-content;
                width: 70%;
            }
    }

    @media (max-width: 815px) {
        div {
            width: 40%;
        }
        input {
            width: 85%;
        }
    }
`

export const InputDoubleStyles = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        gap: 3rem;
   
   > div {
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
    }
    span {
            margin: 0 0.5rem;
            font-size: 0.8rem;
    }

    input {
            max-width: 300px;
            width: 100%;
            height: 28px;
            border: 1px solid #eaeaea;
            padding-inline-start: .225rem;
        }

        
        @media (max-width: 830px) {
        padding: .3rem;
        flex-wrap: wrap;
        flex-direction: column;
        gap: 1rem;
    }
`

export const BottomConfirmBtn = styled.div`
    display: flex;
    position: relative;
    box-sizing: border-box;
    margin-top: calc(1 * 16pt / 2 );
    margin-left: calc(0 * 16pt / 2 );
    margin-right: calc(0 * 16pt / 2 );
    margin-bottom: calc(0 * 16pt / 2 );
    row-gap: calc(0 * 16pt);
    justify-content: center;
    align-items: center;

    button {
        box-sizing: border-box;
        display: inline-block;
        padding: 0 1.25rem;
        height: 2rem;
        min-width: 8.375rem;
        width: 32rem;
        border-radius: 5px;
        font-weight: 400;
        font-size: 0.875rem;
        user-select: none;
        outline: none;
        text-transform: capitalize;
        justify-content: center;
        text-align: center;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        color: #fff;
        background-color: #0DD0B3;
        border: 1px solid #0DD0B3;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: none;
    }

    @media (max-width: 975px) {
      width: 100%;

      button {
          width: 80%;
      }
    }

`

