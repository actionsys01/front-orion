import styled from 'styled-components';

export const TableGrid = styled.div`
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
          /* padding-left: 10px; */
          z-index: 100;
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
