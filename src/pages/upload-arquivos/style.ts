import styled from 'styled-components';

export const MainBox = styled.div`
  height: 200px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
`;

export const InitialTopPhrase = styled.div`
  display: flex;
  justify-content: flex-start;
  p {
    margin: 0 5px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
  gap: 20px;

  svg {
    height: 95px;
    width: 95px;
    cursor: pointer;
  }

  input {
    display: none;
  }
`;
