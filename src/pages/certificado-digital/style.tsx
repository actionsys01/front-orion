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
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    margin-top: 0.8rem;
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
        }
`

export const RightInput = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 70%;
        span {
                margin: 0 0.5rem;
                font-size: 0.8rem;
                white-space: nowrap;
        }

        input {
            max-width: 200px;
            width: 100%;
            height: 88px;
            border: 1px solid #eaeaea;
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

    >  div {
        width: 53%;
        height: 40%;
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
                }
        }

        h4 {
            font-size: 1.25rem; 
            letter-spacing: 0.11rem;
            font-weight: 600;
            margin: 14px auto;
            vertical-align: middle;
            text-align: center ;
            color: red;
        }

        form {
            padding: 0.5rem 3rem;
            box-sizing: border-box;
                
                div {
                    border-radius: 5px;
                    border: 1px solid #eaeaea;
                    height: 25px;
                    width: 85%;
                    display: flex;
                    justify-content: flex-end;
                    svg {
                        
                    }
                }
            

            input {
                display: none;
            }
        }

    }
`