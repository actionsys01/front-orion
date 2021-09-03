import styled from 'styled-components';

export const Container = styled.div`

    display: flex;
    flex: 1;
    flex-direction: column;

    display: flex;
    width: 100%;
    /* border: 1px solid red; */
    /* background: black; */

        table{
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            color : #969cb3;
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background:  #f1f1f1;
            color: #969cb3;
            border-radius: 0.25rem;

            &:first-child{
                color: #363f5f;
            }

        }
    }

`;
