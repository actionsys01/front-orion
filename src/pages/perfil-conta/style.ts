import styled from "styled-components";

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
    /* color: red!IMPORTANT; */
    min-width: 11.375rem!IMPORTANT;
    margin: 15px;
`