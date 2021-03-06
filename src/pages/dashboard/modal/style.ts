import styled from 'styled-components';

export const ModalStyle = styled.div`
    z-index: auto;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.22);
    box-sizing: border-box;

    > div {
        width: 53%;
        height: 35%;
        min-height: 250px;
        border: none;
        position: absolute;
        left: 31%;
        top: 25%;
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

        h5 {
            /* letter-spacing: 0.1rem; */
            font-weight: 600;
            margin: 1rem;
            padding: 0.5rem;
            vertical-align: middle;
            text-align: center;
            color: #444;
        }

        h6 {
            font-weight: 400;
            margin: 0.5rem auto;
            padding: 0.5rem;
            vertical-align: middle;
            text-align: center;
            line-height: 1.3rem;
        }

        div {
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

            > button {
                font-size: 0.85rem;
                border: none;
                color: #1c496a;
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

            button:last-child {
                border-left: 1px solid #eaeaea;
                background-color: #1c496a;
                color: #fff;
            }
        }
    }

    @media (max-width: 1090px) {
        > div {
            height: 58%;
        }
    }

    @media (max-width: 725px) {
        > div {
            left: 38%;
        }
    }

    @media (max-width: 575px) {
        > div {
            height: 65%;
            left: 25%;
        }
    }
`;
