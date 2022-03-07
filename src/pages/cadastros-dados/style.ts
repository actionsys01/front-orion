import styled from 'styled-components';

export const CollumHide = styled.tr`
  .first {
    width: 0px;
    min-width: 0;
    max-width: 0;
    padding: 0 0;
    margin: 0 0;
  }
  .hideSeek {
    display: none;
  }

  > th {
    min-width: 18px !important;
    padding: 0 5px !important;
  }

  td {
    min-width: 10px !important;
    padding: 0 5px !important;
    width: fit-content;
    margin: 0;
  }

  input {
    border: none;
    text-align: center;
    cursor: pointer;
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
