import styled from "styled-components";

interface ModalProps {
    visible: boolean
}

export const ModalInputContainer = styled.div<ModalProps>`
    z-index: 1000;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.20);

    >  div {
        width: 26rem;
        height: auto;
        border: none;
        position: absolute;
        left: 40%;
        top: 25%;
        background-color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        box-shadow: 0 30px 60px rgb(0, 0, 0, 12%);
        

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
                margin: 4px auto;
                font-weight: 400;
                letter-spacing: 1px;
            }

            .input-container {
                text-align: left;
                padding: 16pt;
                div {
                    
                    align-items: center;
                    width: 100%;
                    height: calc(1.687 * 30pt);
                    padding: .5rem 1rem;

                    input, label {
                            display: block;
                        }

                        label {
                            font-size: .8rem;
                        }
        

                    input {
                        max-width: 620px;
                        width: 100%;
                        height: 32px;
                        border: 1px solid #eaeaea;
                        border-radius: 5px;
                    }
                }
            }

            .btn-container {
            display: flex;
            overflow: hidden;
            width: 100%;
            height: 3.625rem;
            /* position: absolute; */
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
                flex: 1;
                height: 100%;
                border-radius: 0;
                min-width: 0;
                background-color: #fff;
                cursor: pointer;
            }

            button:last-child{
            border-left: 1px solid #eaeaea;
            }

            }
        }
        @media (max-width: 710px) {
            > div {
                left: 35%;
            }
        }
        @media (max-width: 615px) {
            > div {
                width: 60%;
                left: 38%;
                .input-container {
                    input {
                        max-width: 550px;
                        width: 65%;
                    }
                }
            }
        }
        @media (max-width: 575px) {
            > div {
                width: 60%;
                left: 25%;
                min-width: 300px;
                .input-container {
                    input {
                        max-width: 550px;
                        width: 65%;
                    }
                }
            }
        }
        @media (max-width: 575px) {
            > div {
                left: 15%;
            }
        }
`