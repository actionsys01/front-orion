import styled from 'styled-components';

export const ModalStyle = styled.div`
  z-index: 1000;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);

  > div {
    width: 63%;
    height: 55%;
    border: none;
    position: absolute;
    left: 25%;
    top: 25%;
    background-color: #fff;
    padding: 1rem 2rem;
    box-sizing: border-box;

    svg {
      cursor: pointer;
    }
  }
`;

export const TableModalStyle = styled.div`
  margin: 0;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: auto;
  min-height: 26rem;

  table {
    width: 100%;
    border-spacing: 0;
    border-radius: 5px;

    thead {
      display: table-header-group;
      vertical-align: middle;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background-color: #1c496a;
      color: #fff;
      height: 2.5rem;

      tr {
        th:first-child {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        th:last-child {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        th {
          min-width: 45px;
          /* width: 0%; */
          font-size: 0.75rem;
          font-weight: normal;
          text-align: center;
          letter-spacing: 0;
          padding: 0 15px;
          white-space: nowrap;
        }
      }
    }

    tbody {
      position: relative;
      tr {
        td:first-child {
          padding-left: 15px;
          width: 12px;

          > div {
            width: 20px;
          }
        }
        td {
          border-bottom: 1px solid #eaeaea;
          color: #444;
          height: 3rem;
          white-space: nowrap;
          padding: 0 15px;
          text-align: center;
        }
      }
    }
  }
`;
