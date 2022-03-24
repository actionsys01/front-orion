import styled from 'styled-components';

export const MainPage = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25px;
  /* > div {
    flex-direction: column;
  } */
`;

export const PageStyles = styled.div`
  width: 62%;

  label {
    padding: 0 0.5rem;
    font-weight: 400;
  }
  input,
  label {
    display: block;
  }
`;

export const TripleInputLineStyle = styled.div`
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

    .MuiFormControl-root {
      margin-top: 6px;
      width: 100%;
      padding: 0 4px 0 4px;
    }

    .MuiFormGroup-root {
      justify-content: space-around;
    }

    .MuiFormControlLabel-root {
      display: flex;
      flex-direction: column-reverse;
      margin: 0;
    }

    .MuiTypography-body1 {
      font-size: 12px;
    }

    .MuiSvgIcon-root {
      font-size: 18px;
      height: fit-content;
    }

    .MuiRadio-colorSecondary.Mui-checked {
      color: #1c496a;
    }

    .PrivateSwitchBase-root-1 {
      padding: 6px;
    }
  }
  .checkbox-line {
    display: flex;
    align-items: center;
    justify-content: center;
    label {
      font-size: 12px;
    }
    .MuiSvgIcon-root {
      font-size: 18px;
      cursor: pointer;
    }

    .Mui-checked {
      color: #1c496a;
    }
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

export const RastroCheckBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 55rem;
  label {
    font-size: 12px;
  }
  .MuiSvgIcon-root {
    font-size: 18px;
    cursor: pointer;
  }

  .Mui-checked {
    color: #1c496a !important;
  }
`;

export const SelectLineStyles = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 15px;
  width: 55rem;

  label {
    font-size: 14px;
  }

  select,
  input {
    cursor: pointer;
    max-width: 220px;
    width: 100%;
    height: 28px;
    border: 1px solid #eaeaea;

    option {
      font-size: 12px;
    }
  }
`;

export const AdvanceBtn = styled.button`
  margin-top: 20px;
  margin-right: 80px;
`;

export const UMStyles = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  gap: 15px;

  > div {
    input,
    label {
      display: block;
    }

    input {
      cursor: pointer;
      width: 100%;
      height: 28px;
      border: 1px solid #eaeaea;
      max-width: 220px;
    }

    select {
      cursor: pointer;
      width: 100%;
      height: 30px;
      border: 1px solid #eaeaea;
      min-width: 80px;
      margin-top: 24px;
    }

    option {
      font-size: 12px;
      text-align: center;
    }
  }
`;

export const TextDiviser = styled.div`
  margin-top: 75px;
  margin-left: 20px;
`;

export const TripleSelectLine = styled.select`
  cursor: pointer;
  width: 100%;
  height: 30px;
  border: 1px solid #eaeaea;
  min-width: 150px !important;
  margin-top: 4px !important;

  option {
    font-size: 12px;
    text-align: center;
  }
`;

export const ImageBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 360px;
  height: 320px;
  border: 1px solid #1c496a;
  border-radius: 8px;

  svg {
    height: 80px;
    width: 80px;
  }

  img {
    object-fit: contain;
    /* border-radius: 50%; */
    box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.2);
    width: 360px;
    height: auto;
    max-height: 320px;
    cursor: pointer;
  }
`;

export const UploadBtn = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  /* margin: 10px; */
  row-gap: calc(0 * 16pt);
  justify-content: center;
  align-items: center;

  div {
    box-sizing: border-box;
    display: flex;
    padding: 0 1.25rem;
    height: 2rem;
    min-width: 13.375rem;
    width: initial;
    border-radius: 5px;
    font-weight: 400;
    font-size: 0.875rem;
    user-select: none;
    outline: none;
    text-transform: capitalize;
    justify-content: center;
    align-items: center;
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

    input {
      display: none;
    }
  }
`;

export const CategoryCodesStyles = styled.div`
  input,
  label {
    display: block;
  }

  label {
    margin-top: 15px;
  }

  input {
    cursor: pointer;
    width: 100%;
    height: 28px;
    border: 1px solid #eaeaea;
    max-width: 180px;
  }
`;
