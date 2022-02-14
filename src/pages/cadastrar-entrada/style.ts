import styled from 'styled-components';

export const Section = styled.div`
    width: 85%;
    margin: 0 auto;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin: 0.3rem;

        h6 {
            color: #444;
        }
    }
`;

export const OneLineContainer = styled.div`
    border: 1px solid rgba(151, 151, 151, 0.45);
    padding: 1rem;
    display: flex;

    > form {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        gap: 3rem;

        span {
            margin: 0 0.2rem;
            font-size: 0.8rem;
        }

        input {
            max-width: 620px;
            width: 100%;
            height: 22px;
            border: 1px solid #eaeaea;
        }
    }

    @media (max-width: 1020px) {
        flex-wrap: wrap;
        input {
            max-width: 350px !important;
        }
    }

    @media (max-width: 650px) {
        flex-direction: column;
    }
`;
export const Inline = styled.div`
    border: 1px solid rgba(151, 151, 151, 0.45);
    padding: 1rem;

    > div {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 15%;

        div {
            display: flex;
            align-items: center;
        }
        span {
            margin: 0 0.5rem;
            font-size: 0.8rem;
            white-space: nowrap;
        }

        input {
            max-width: 250px;
            width: 100%;
            height: 22px;
            border: 1px solid #eaeaea;
        }
    }

    @media (max-width: 830px) {
        div {
            flex-wrap: wrap;
        }
        span {
            white-space: normal;
        }
    }
`;

export const ModalContainer = styled.div`
    border: 1px solid rgba(151, 151, 151, 0.45);
    padding: 1rem;

    > div {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 15%;
        min-height: 38px;
        position: relative;

        div {
            display: flex;
            align-items: center;
            transition: ease-in 5s;
        }

        .first {
            margin: 0 0.5rem;
        }

        .second {
            margin: 0 1.2rem;
        }

        span {
            margin: 0 1.3rem;
            font-size: 0.8rem;
            white-space: nowrap;
            /* width: 6rem; */
        }

        .icon {
            position: absolute;
            right: 0;
            .MuiSvgIcon-root {
                font-size: 18px;
                cursor: pointer;
            }

            .Mui-checked {
                color: #1c496a;
            }
        }

        input {
            max-width: 120px;
            width: 100%;
            height: 22px;
            border: 1px solid #eaeaea;
            /* text-align: center; */
        }

        .description {
            max-width: 150px;
            width: 100%;
            height: 22px;
            border: 1px solid #eaeaea;
        }
    }

    @media (max-width: 1250px) {
        .icon {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    @media (max-width: 1160px) {
        div {
            flex-wrap: wrap;
            flex-direction: column;
        }
        span {
            white-space: normal;
        }
        .icon {
            margin: 0;
            padding: 0;
            right: -45px !important;
            top: 0;
        }
        input {
            max-width: 220px !important;
            width: 100%;
        }
    }

    @media (max-width: 675px) {
        .icon {
            right: -20px;
        }
        input {
            max-width: 180px !important;
            width: 100%;
        }
    }
`;

export const BtnPattern = styled.button`
    /* display: none; */
    color: #fff;
    background-color: #1c496a;
    border: 1px solid #1c496a;
    border-radius: 5px;
    padding: 0 1.25rem;
    height: 1.7rem;
    font-weight: 400;
    font-size: 0.875rem;
    cursor: pointer;

    @media (max-width: 1030px) {
        padding: 0 0.75rem;
    }
`;

export const FormContainer = styled.div`
    border: 1px solid rgba(151, 151, 151, 0.45);
    padding: 1rem;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1170px) {
        flex-wrap: wrap;
    }

    @media (max-width: 830px) {
        flex-wrap: wrap;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;

    > div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        align-items: center;

        > span {
            margin: 0 0.5rem;
            font-size: 0.8rem;
            white-space: nowrap;
        }

        > input {
            max-width: 150px;
            width: 50%;
            height: 22px;
            text-align: center;
            border: 1px solid #eaeaea;
        }

        input[type='date'] {
            max-width: 150px;
            width: 50%;
            height: 26px;
            text-align: center;
            border: 1px solid #eaeaea;
            font-size: 0.9rem;
        }

        input[type='time'] {
            min-width: 100px;
            width: 50%;
            height: 26px;
            text-align: center;
            border: 1px solid #eaeaea;
        }

        .disabled::-webkit-calendar-picker-indicator {
            display: none;
        }

        .disabled[type='date'],
        .disabled {
            color: rgba(0, 0, 0, 0);
            background-color: #eaeaea;
        }

        input[type='date']::-webkit-calendar-picker-indicator {
            margin: 0;
        }
        input[type='time']::-webkit-calendar-picker-indicator {
            display: none;
        }

        select {
            min-width: 85px;
            width: 50%;
            height: 22px;
            text-align: center;
            border: 1px solid #eaeaea;
            font-size: 0.8rem;
            line-height: 0.8rem;

            option {
                line-height: 2rem;
            }
        }
    }

    @media (max-width: 1170px) {
        flex-wrap: wrap;
    }

    @media (max-width: 980px) {
        flex-wrap: wrap;
    }
`;

export const EntranceGrid = styled.div`
    margin: 0;
    box-sizing: border-box;
    overflow: auto;
    width: 85%;
    min-height: 7rem;

    table {
        width: 100%;
        border-spacing: 0;

        thead {
            display: table-header-group;
            vertical-align: middle;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            background-color: #1c496a;
            color: #fff;
            height: 2.5rem;
            border-radius: 5px;

            > tr {
                th:first-child {
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }
                th:last-child {
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
                th {
                    min-width: 45px;
                    font-size: 0.75rem;
                    font-weight: normal;
                    text-align: left;
                    letter-spacing: 0;
                    padding: 0 15px;
                    white-space: nowrap;
                }
            }
        }

        tbody {
            > tr {
                td:first-child {
                    padding-left: 10px;
                }
                td {
                    border-bottom: 1px solid #eaeaea;
                    color: #444;
                    height: 3rem;
                    white-space: nowrap;
                    padding: 0 15px;
                    text-align: center;
                }
            }
        }
    }
`;

export const BtnStyle = styled.button`
    display: flex;
    justify-content: flex-end;
    font-size: 0.67rem;
    padding: 4px;
    cursor: pointer;
`;
