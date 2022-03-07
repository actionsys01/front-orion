import styled from 'styled-components';

export const AddBtn = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  margin-left: calc(0 * 16pt / 2);
  margin-right: calc(0 * 16pt / 2);
  margin-bottom: 10px;
  row-gap: calc(0 * 16pt);
  justify-content: flex-end;
  align-items: center;

  button {
    box-sizing: border-box;
    display: inline-block;
    padding: 0 1.25rem;
    height: 2rem;
    min-width: 9.375rem;
    width: initial;
    border-radius: 5px;
    font-weight: 400;
    font-size: 0.875rem;
    user-select: none;
    outline: none;
    text-transform: capitalize;
    justify-content: center;
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

    span {
      display: flex;
      position: absolute;
      top: 8px;

      svg {
        display: flex;
        align-items: center;
        height: 15px;
        width: 15px;
      }
    }
  }
`;

export const TopConfirmBtn = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  margin-left: calc(0 * 16pt / 2);
  margin-right: calc(0 * 16pt / 2);
  margin-bottom: 10px;
  row-gap: calc(0 * 16pt);
  justify-content: flex-end;
  align-items: center;

  button {
    box-sizing: border-box;
    display: inline-block;
    padding: 0 1.25rem;
    height: 2rem;
    min-width: 9.375rem;
    width: initial;
    border-radius: 5px;
    font-weight: 400;
    font-size: 0.875rem;
    user-select: none;
    outline: none;
    text-transform: capitalize;
    justify-content: center;
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
  }
`;

export const BottomConfirmBtn = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  margin-left: calc(0 * 16pt / 2);
  margin-right: calc(0 * 16pt / 2);
  margin-bottom: 10px;
  row-gap: calc(0 * 16pt);
  justify-content: center;
  align-items: center;

  button {
    box-sizing: border-box;
    display: inline-block;
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
  }
`;

export const FilterBtn = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  margin-left: calc(0 * 16pt / 2);
  margin-right: calc(0 * 16pt / 2);
  margin-bottom: 10px;
  row-gap: calc(0 * 16pt);
  justify-content: flex-end;
  align-items: center;

  button {
    box-sizing: border-box;
    display: inline-block;
    padding: 0 1.25rem;
    height: 2rem;
    min-width: 9.375rem;
    width: initial;
    border-radius: 5px;
    font-weight: 400;
    font-size: 0.875rem;
    user-select: none;
    outline: none;
    text-transform: capitalize;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    transition: background-color 200ms ease 0ms, box-shadow 200ms ease 0ms,
      border 200ms ease 0ms, color 200ms ease 0ms;
    position: relative;
    overflow: hidden;
    color: #fff;
    background-color: #1c496a;
    border: 1px solid #1c496a;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: none;

    span {
      display: flex;
      position: absolute;
      top: 8px;

      svg {
        display: flex;
        align-items: center;
        height: 15px;
        width: 15px;
      }
    }
  }
`;

export const BtnRow = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  margin-left: calc(0 * 16pt / 2);
  margin-right: calc(0 * 16pt / 2);
  margin-bottom: 10px;
  gap: 12px;
  justify-content: flex-end;
  align-items: center;

  button {
    box-sizing: border-box;
    display: inline-block;
    padding: 0 1.25rem;
    height: 2rem;
    min-width: 9.375rem;
    width: initial;
    border-radius: 5px;
    font-weight: 400;
    font-size: 0.875rem;
    user-select: none;
    outline: none;
    text-transform: capitalize;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    transition: background-color 200ms ease 0ms, box-shadow 200ms ease 0ms,
      border 200ms ease 0ms, color 200ms ease 0ms;
    position: relative;
    overflow: hidden;
    color: #fff;
    background-color: #1c496a;
    border: 1px solid #1c496a;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: none;

    span {
      display: flex;
      position: absolute;
      top: 8px;

      svg {
        display: flex;
        align-items: center;
        height: 15px;
        width: 15px;
      }
    }
  }

  button:nth-child(2n) {
    background-color: #0dd0b3;
    border: 1px solid #0dd0b3;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: none;
  }
`;
