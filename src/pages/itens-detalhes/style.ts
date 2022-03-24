import styled from 'styled-components';

export const ProdutosDetailStyle = styled.div`
  height: 37.3px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  vertical-align: middle;
  background-color: #21232e;

  ul {
    color: #1ad4ff;
    display: flex;
    gap: 4rem;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0 55px;

    li {
      white-space: nowrap;
      cursor: pointer;
      margin: 0;
      padding: 0;
      /* align-items: center;
        display: flex; */
      /* list-style-type: none; */
    }
  }

  ul li::before {
    display: none;
  }
  .active {
    background-color: #fff;
    padding: 8.7px;
    padding-inline: 30px;
  }
  .active::after {
    display: none;
  }
`;