import styled from 'styled-components';

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px;
  h5,
  h6 {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  div {
    display: flex !important;
    justify-content: center !important;
  }

  a {
    text-transform: none;
  }
`;

export const TokenContainer = styled.div`
  display: flex;
  justify-content: center;
  div {
    border: 1px solid #eaeaea;
    width: 40rem;
    height: 3rem;
  }
`;
