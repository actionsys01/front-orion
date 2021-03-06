import styled from 'styled-components';

export const SelectStyle = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 15px 25px;
    input[type='month'] {
        width: 195px;
        height: 30px;
        border: 1px solid #eaeaea;
        text-align: center;
        font-size: 0.9rem;
        padding: 0.2rem;
    }
    input[type='month']::-webkit-calendar-picker {
        background-color: orange;
    }
`;

export const Speedometer = styled.div`
    display: flex;
    gap: 3rem;

    > div {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        align-items: center;

        span {
            display: flex;
            justify-content: center;
            position: relative;
            width: auto;
            h5 {
                position: absolute;
                top: 6rem;
                white-space: nowrap;
                font-weight: 400;
            }
        }
    }

    h3,
    h5 {
        color: #444;
    }

    @media (max-width: 860px) {
        flex-direction: column;
        gap: 10rem;
    }

    @media (max-width: 1065px) {
        justify-content: center;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    height: 30%;
    gap: 7rem;
    white-space: nowrap;
    align-items: center;
    /* align-items: start; */
    justify-content: space-around;
    padding: 2rem;

    > div:nth-child(2) {
        box-sizing: border-box;
        width: 32%;
        white-space: nowrap;
        height: 100%;

        > div {
            textarea {
                text-overflow: visible;
                font-weight: 400;
            }
        }
    }

    > div {
        display: flex;
        gap: 3rem;

        > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
        }

        textarea {
            white-space: normal;
            /* margin: 1.5rem 0; */
            padding: 0.5rem 1rem;
            -webkit-user-modify: read-write-plaintext-only;
            min-height: 380px;
            border: none;
            background-color: transparent;
            resize: none;
            min-width: 365px;
        }

        svg {
            font-size: 2rem;
        }
    }

    h3 {
        color: #444;
    }

    @media (max-width: 860px) {
        gap: 2rem;
        width: 100%;
        > div:nth-child(2) {
            width: 60%;
        }
    }

    @media (max-width: 1090px) {
        flex-direction: column;
        height: fit-content;
        div {
            > div {
                textarea {
                    min-height: 10rem;
                }
            }
        }
    }

    @media (min-width: 1890px) {
        /* flex-direction: column;
    height: fit-content; */
        padding: 2rem 3rem;
        justify-content: space-between;
        /* align-items: start; */
    }
`;
