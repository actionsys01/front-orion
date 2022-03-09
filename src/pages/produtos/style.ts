import styled from 'styled-components';

export const MainPage = styled.div`
  display: flex;
  justify-content: center;

  /* > div {
    flex-direction: column;
  } */
`;

export const LabelStyle = styled.div`
  width: 62%;

  label {
    padding: 0 0.5rem;
    font-weight: bold;
  }
  input,
  label {
    display: block;
  }
`;

export const LabelLineStyle = styled.div`
  display: flex;
  margin-top: 12px;

  > div {
    display: flex;
    gap: 15px;
    /* flex-direction: row; */
    label {
      margin-top: 8px;
      padding: 0 0.5rem;
      font-weight: 500;
      font-size: 12px;
    }
    input,
    label {
      display: block;
    }
  }
`;

export const InputDescripton = styled.input`
  max-width: 580px;
  width: 100%;
  height: 28px;
  border: 1px solid #eaeaea;
`;

export const InputTriple = styled.input`
  max-width: 180px;
  width: 100%;
  height: 28px;
  border: 1px solid #eaeaea;
`;

export const BoxStyle = styled.div`
  margin-top: 22px;
  height: fit-content;
  > div {
    width: 240px;
    height: 55px;
    border: 1px solid #eaeaea;
  }
`;

export const TextAreaStyles = styled.div`
  margin-top: 35px;
  width: 100%;
  textarea {
    min-width: 230px;
    width: 55rem;
    height: 75px;
    border: 1px solid #eaeaea;
    padding-inline-start: 0.225rem;
    resize: none;
  }
`;
