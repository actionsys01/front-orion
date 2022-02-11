import styled from 'styled-components';

export const Section = styled.form`
  display: flex;
  flex-direction: column;
  /* border: 1px solid rgba(151, 151, 151, .45); */
  /* width: 100%; */

  section {
    margin: 0 auto;
    padding: 1rem;
    gap: 0.5rem;
    margin-bottom: 1rem;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 1075px) {
    > div {
      flex-direction: column;
    }
  }
`;

export const InputStyle = styled.div`
  label {
    padding: 0 0.5rem;
  }
  /* width: 100%; */
  input,
  label {
    display: block;
  }

  input {
    min-width: 420px;
    width: 100%;
    height: 28px;
    border: 1px solid #eaeaea;
    letter-spacing: 0.04rem;
  }

  @media (max-width: 1075px) {
    input {
      width: 65%;
    }
  }
`;

export const SmallInputs = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Column = styled.div`
  display: flex;
  width: 425px;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;

  .uf {
    display: flex;
    flex-direction: column;

    /* margin-bottom: .5rem; */

    span {
      margin: 0 0.5rem;
      font-size: 0.8rem;
      white-space: nowrap;
    }

    select {
      min-width: 85px !important;
      width: 90% !important;
      height: 28px;
      border: 1px solid #eaeaea;
      text-align: center;
    }
  }

  @media (max-width: 980px) {
    flex-wrap: wrap;
    flex-direction: column;
    gap: 1.5rem;
    .uf {
      width: 55%;
    }
    input {
      max-width: 180px;
      width: 55% !important;
    }
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  gap: 5rem;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.775rem;
    font-weight: normal;
    letter-spacing: 0;

    span {
      .MuiSvgIcon-root {
        font-size: 18px;
      }

      .Mui-checked {
        color: #1c496a;
      }
    }
  }
`;
