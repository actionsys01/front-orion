import styled from "styled-components";

export const FilterModalStyle = styled.div`
    z-index: auto;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.22);
    box-sizing: border-box;

    > div {
        width: auto;
        height: 500px;
        max-height: 100%;
        min-height: 250px;
        border: none;
        position: absolute;
        left: 40%;
        top: 10%;
        background-color: #fff;
        border-radius: 5px;
        z-index: 1010;
        overflow-y: auto;
        padding: 1rem;
    }

    @media (max-width: 720px) {
        > div {
            min-width: 380px;
        }
    }

    @media (max-width: 570px) {
        > div {
            left: 15%;
        }
    }

    @media (max-width: 460px) {
        > div {
            left: 8%;
            min-width: 350px;
        }
    }

    @media (max-width: 361px) {
        > div {
            left: 5%;
            min-width: 330px;
        }
    }
`


export const ModalLines = styled.div`
    display: grid;
    gap: 10px;
    margin-top: .5rem;
    grid-template-columns: 150px 150px 20px;
    align-items: center;
    justify-content: center;

    select {
        border-color: #1C496A;
        border: 1px solid #1C496A;
        background-color: #1C496A;
        font-size: 12px;
        height: 24px;
        display: flex;
        border-radius: 5px;
        cursor: pointer;
        color: #fff;
/* parece que o seguinte é a option */
        option {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 8px;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            flex-wrap: wrap;
        }
    }

    input {
        font-size: 12px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #1C496A;
        background-color: #1C496A;
        height: 24px;
        color: #fff;
    }

    > svg {
        height: 1rem;
        cursor: pointer;
    }
`

export const AddRow = styled.button`
    

  
        font-size: 10px;
        font-weight: bold;
        background-color: transparent;
        display: flex;
        justify-content: center;
        border-width: 0;
        cursor: pointer;

        svg {
            stroke: #fff;
            fill: #1C496A;
            height: .7rem;
            width: 1rem;
        }
    
`

export const ButtonsRow = styled.div`
    display: flex;
    position: relative;
    box-sizing: border-box;
    margin-left: calc(1 x 16pt / 2 );
    margin-right: calc(1 x 16pt / 2 );
    justify-content: space-between;
    align-items: center;
    margin-top: 1.2rem;


    button {
        border: none;
        background-color: transparent;
        font-size: 10px;
        justify-content: center;
        display: flex;
        cursor: pointer;
    }
`