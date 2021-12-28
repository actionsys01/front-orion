import styled from "styled-components";

interface ModalProps {
    visible: boolean
}

export const ProfileBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: red; */

    > div {
        /* background-color: blue; */
        height: 30rem;
        width: 35%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
`

export const LogoContainer = styled.div`
    margin: 25px;
        img {
            object-fit: contain;
            border-radius: 50%;
            box-shadow: 0 1px 4px 1px rgba(0, 0, 0, .2);
            width: 95px;
            height: auto;
            cursor: pointer;
        }

        .no-logo {
            width: 95px;
            height: 95px;
            background-color: rgba(234, 234, 234, .2);
            border-radius: 50%;
            box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;

                p { 
                    text-align: center;
                    font-size: 7px;
                    cursor: pointer;
                }
                }

                input {
                    display: none;
                   
        }
`

export const BodyRow = styled.div` 
    text-align: center;
    h6 {
        margin: 0;
        font-weight: 400;
    }
`

export const ButtonStyle = styled.button` 
    min-width: 11.375rem!IMPORTANT;
    margin: 15px;
`

export const LogoModalStyle = styled.div<ModalProps>` 
    z-index: 1000;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.20);

    >  div {
    width: 33%;
    min-width: 300px;
    height: 30%;
    border: none;
    position: absolute;
    left: 40%;
    top: 25%;
    background-color: #fff;


    h4, h6 {
    letter-spacing: 0.11rem;
    font-weight: 600;
    margin: 20px 4px auto;
    vertical-align: middle;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 60%; */
    }

    h6 {
        margin: 16px auto;
        font-weight: 400;
        letter-spacing: 1px;
    }

   > div {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 3.625rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #eaeaea;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    >  button {
        font-size: 0.75rem;
        border: none;
        color: #1C496A;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 50%;
        border-radius: 0;
        background-color: #fff;
        cursor: pointer;
    }

    label {
        width: 50%;
       > div {
            font-size: 0.75rem;
            border: none;
            color: #1C496A;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            border-radius: 0;
            background-color: #fff;
            cursor: pointer;
            border-left: 1px solid #eaeaea;
            input {
                    display: none;
        }
            }
    }
    }
    }
    @media (max-width: 560px) {
        > div {
            left: 25%;
        }
}
    @media (max-width: 445px) {
        > div {
            left: 18%;
        }
}
`