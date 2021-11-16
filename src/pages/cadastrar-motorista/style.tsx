import styled from "styled-components";

export const Section = styled.div`
    display: flex;
    align-items: center;
    height: 50%;
    box-sizing: border-box;
    
    form {
        margin: 0 auto;
        padding: 2rem ;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid #eaeaea;
        box-sizing: border-box;
    }

    @media (max-width: 830px) {
       form {
           padding: .2rem 0;
           box-sizing: border-box;
       }
    }
`

export const InputStyles = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: .3rem;
   
    div {
        width: 45%;
        display: flex;
        justify-content: flex-start;
    }
    span {
            margin: 0 0.5rem;
            font-size: 0.8rem;
    }

    input {
            max-width: 510px;
            width: 100%;
            height: 28px;
            border: 1px solid #eaeaea;
            padding-inline-start: .225rem;
        }
   

        @media (max-width: 830px) {
        padding: .3rem;
        width: 70%;
        flex-wrap: wrap;
            div {
                width: 100%;
                justify-content: center;
            }
            input{
                width: 70%;
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

        input[type= "date" ] {
            min-width: 220px;
            text-align: center;
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
    margin-left: calc(0 * 16pt / 2 );
    margin-right: calc(0 * 16pt / 2 );
    margin-bottom: 10px;
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

    @media (max-width: 830px) {
      width: 60%;
    }

`