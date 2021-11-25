import styled from "styled-components";

export const FilterModal = styled.div`
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
        width: 48%;
        height: 60%;
        min-height: 250px;
        border: none;
        position: absolute;
        left: 31%;
        top: 20%;
        background-color: #fff;
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

export const ModalTitle = styled.div`
    padding: 1rem;;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    h6 {
        color: #444;
    }
`
export const ModalContent = styled.div`
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    min-height: 68%;
    
`

export const ModalLines = styled.div`
    display: flex;
    box-sizing: border-box;

    > div {

        padding: .5rem 1rem;
        

        input, label {
            display: block;
        }

        label {
            font-size: .8rem;
        }
        
        input{ 
            height: 28px;
            border: 1px solid #eaeaea;
            max-width: 200px;
            width: 100%;
        }
    }

    > div:nth-child(2) {
        input {
            max-width: 120px;
            width: 100%;
        }
    }

    > div:nth-child(4) {
        position: relative;

        svg {
            position: absolute;
            left: 0;
            top: 30px;
            cursor: pointer;
        }
    }

    @media (max-width: 770px) {
        /* flex-direction: column; */
        label {
            font-size: .6rem;
            white-space: nowrap;
        }
    }
`

export const AddButton = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;

    button {
        width: 120px;
        border: 2px solid #eaeaea;
        border-radius: 5px;
        color: #444;
        cursor: pointer;
    }
    
    span {
            display: flex;
            position: absolute;
            top: 24px;
            
            svg {
                display: flex;
                align-items: center;
                height: 15px;
                width: 15px;
            }
        }
`

export const ButtonLine = styled.div`
    padding: .6rem 2rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    button {
        border: 1px solid #eaeaea;
        background-color: #fff;
        border-radius: 5px;
        font-size: .8rem;
        padding: .4rem .8rem;
        width: 25%;
        cursor: pointer;
    }

    button:nth-child(2) {
        color: #fff;
        background-color: #1C496A;
    }
`