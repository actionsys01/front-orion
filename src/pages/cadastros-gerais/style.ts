import styled from 'styled-components';

export const IconLine = styled.div`
  display: flex;
  justify-content: center;
  gap: 35px;
  margin: 45px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 190px;

    label {
      text-align: center;
    }

    svg {
      height: 85px;
      width: 85px;
      cursor: pointer;
    }
  }
`;
