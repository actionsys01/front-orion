import styled from 'styled-components';


export const Container = styled.div`
        display: flex;
        width: 100%;
        height: 460px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .4rem;

    h4 {
        color:  #444;
    }
`;



export const Form = styled.div`

    width: 20%;

    > div {
        margin-top: .4rem;
    }

    button { 
        margin-top: .4rem;
    }
`;