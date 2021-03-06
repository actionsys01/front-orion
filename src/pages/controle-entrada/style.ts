import styled from 'styled-components';

export const EntranceGrid = styled.div`
    margin: 0;
    box-sizing: border-box;
    overflow: auto;
    /* width: 81.6vw; */
    min-height: 26rem;

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

            tr {
                th:first-child {
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }
                th:nth-child(2) {
                    text-align: left;
                    padding-inline-start: 2rem;
                }
                th:last-child {
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
                th {
                    min-width: 45px;
                    font-size: 0.75rem;
                    font-weight: normal;
                    text-align: center;
                    letter-spacing: 0;
                    padding: 0 15px;
                    white-space: nowrap;
                }
            }
        }

        tbody {
            tr {
                td:first-child {
                    padding-left: 10px;
                    width: 150px;
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

export const BtnRow = styled.div`
    display: flex;
    position: relative;
    box-sizing: border-box;
    margin-left: calc(0 * 16pt / 2);
    margin-right: calc(0 * 16pt / 2);
    margin-bottom: 10px;
    row-gap: calc(0 * 16pt);
    justify-content: space-between;
    align-items: center;

    > div {
        display: flex;
        gap: 10px;
    }
    .add {
        box-sizing: border-box;
        display: inline-block;
        padding: 0 1.25rem;
        height: 2rem;
        min-width: 9.375rem;
        width: initial;
        border-radius: 5px;
        font-weight: 400;
        font-size: 0.875rem;
        user-select: none;
        outline: none;
        text-transform: capitalize;
        justify-content: center;
        text-align: center;
        white-space: nowrap;
        transition: background-color 200ms ease 0ms, box-shadow 200ms ease 0ms,
            border 200ms ease 0ms, color 200ms ease 0ms;
        position: relative;
        overflow: hidden;
        color: #fff;
        background-color: #0dd0b3;
        border: 1px solid #0dd0b3;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: none;

        span {
            display: flex;
            position: absolute;
            top: 8px;

            svg {
                display: flex;
                align-items: center;
                height: 15px;
                width: 15px;
            }
        }
    }
    .disabled {
        background-color: #eaeaea;
        border: 1px solid #eaeaea;
        box-sizing: border-box;
        display: inline-block;
        padding: 0 1.25rem;
        height: 2rem;
        min-width: 9.375rem;
        width: initial;
        border-radius: 5px;
        font-weight: 400;
        font-size: 0.875rem;
        justify-content: center;
        text-align: center;
        white-space: nowrap;
        position: relative;
        cursor: not-allowed;
        span {
            display: flex;
            position: absolute;
            top: 8px;

            svg {
                display: flex;
                align-items: center;
                height: 15px;
                width: 15px;
            }
        }
    }
`;
