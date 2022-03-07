import styled from 'styled-components';

export const Form = styled.div`
  padding: 10px 15px;
`;

export const RowStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const InputStyles = styled.div`
  margin-top: 10px;
  label {
    margin-top: 8px;
    padding: 0 0.5rem;
    font-weight: bold;
  }
  input,
  label {
    display: block;
  }

  input {
    min-width: 440px;
    width: 100%;
    height: 32px;
    border: 1px solid #eaeaea;
    letter-spacing: 0.04rem;
    padding-inline-start: 8px;
  }
  .description {
    min-width: 220px;
    width: 100%;
    border: 1px solid #eaeaea;
    height: 32px;
    padding-inline-start: 8px;
  }

  .chave {
    min-width: 100px;
    width: 300px;
    /* width: 100%; */
    border: 1px solid #eaeaea;
    height: 32px;
    padding-inline-start: 8px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  @media (max-width: 1185px) {
    input {
      max-width: 280px;
      min-width: 150px;
    }
  }

  /* @media (max-width: 1015px) {
    input {
      width: 65%;
      min-width: 280px;
    }
  }

  @media (max-width: 870px) {
    input {
      width: 45%;
      min-width: 200px;
    }
  } */
`;

export const InputBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  /* margin-top: 25px; */

  > div {
    border: 1px solid #eaeaea;
    width: 365px;
    padding: 8px;
  }
`;

export const BoxTitles = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 12px;
  margin-top: 25px;
  color: #808080;
`;
