import styled from 'styled-components';

export const PopStyle = styled.div`
  position: relative;
  cursor: pointer;

  div /* primeira div */ {
    position: absolute;
    width: -webkit-fill-available;
    min-width: min-content;
    height: fit-content;
    min-height: 90px;
    bottom: -2.865rem;
    left: 26.99825px;
    background-color: #fff;
    color: #1c496a;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
    border: none;
    box-sizing: border-box;
    padding: 8pt 12pt;
    text-align: center;

    .able {
      cursor: pointer;
      margin: 0;
      font-size: 0.875rem;
      line-height: 2rem;
    }
    .disabled {
      opacity: 0;
      margin: 0;
      font-size: 0.875rem;
      line-height: 2rem;
      color: #eaeaea;
      cursor: default;
    }
  }

  div:before {
    content: '';
    position: absolute;
    left: 0;
    top: 42%;
    width: 14px;
    height: 2px;
    border: 11px solid transparent;
    border-right-color: #fff;
    border-left: 0;
    margin-top: -4px;
    margin-left: -11px;
  }

  .beforeLast-prop {
    bottom: -1.565rem;
  }

  .beforeLast-prop:before {
    margin-top: 17px;
  }

  .last-prop {
    bottom: -0.565rem;
  }

  .last-prop:before {
    margin-top: 33px;
  }
`;

export const PopStyleDouble = styled.div`
  position: relative;
  cursor: pointer;

  div /* primeira div */ {
    position: absolute;
    width: -webkit-fill-available;
    min-width: min-content;
    height: fit-content;
    min-height: 90px;
    bottom: -1.2rem;
    left: 26.99825px;
    background-color: #fff;
    color: #1c496a;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
    border: none;
    box-sizing: border-box;
    padding: 8pt 12pt;
    text-align: center;

    p {
      cursor: pointer;
      margin: 0;
      font-size: 0.875rem;
      line-height: 2rem;
    }
  }

  div:before {
    content: '';
    position: absolute;
    left: 0;
    top: 42%;
    width: 14px;
    height: 2px;
    border: 11px solid transparent;
    border-right-color: #fff;
    border-left: 0;
    margin-top: 7px;
    margin-left: -11px;
  }

  .beforeLast-prop {
    bottom: -1.565rem;
  }

  .beforeLast-prop:before {
    margin-top: 17px;
  }

  .last-prop {
    bottom: -0.565rem;
  }

  .last-prop:before {
    margin-top: 33px;
  }
`;

export const PopStyleFourLines = styled.div`
  position: relative;
  cursor: pointer;

  div /* primeira div */ {
    position: absolute;
    width: -webkit-fill-available;
    min-width: min-content;
    height: fit-content;
    min-height: 90px;
    bottom: -5.2rem;
    left: 26.99825px;
    background-color: #fff;
    color: #1c496a;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
    border: none;
    box-sizing: border-box;
    padding: 8pt 12pt;
    text-align: center;

    .able {
      cursor: pointer;
      margin: 0;
      font-size: 0.875rem;
      line-height: 2rem;
    }
    .disabled {
      opacity: 0;
      margin: 0;
      font-size: 0.875rem;
      line-height: 2rem;
      color: #eaeaea;
      cursor: default;
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  div:before {
    content: '';
    position: absolute;
    left: 0;
    top: 42%;
    width: 14px;
    height: 2px;
    border: 11px solid transparent;
    border-right-color: #fff;
    border-left: 0;
    margin-top: -22px;
    margin-left: -11px;
  }

  .beforeLast-prop {
    bottom: -1.565rem;
  }

  .beforeLast-prop:before {
    margin-top: 36px;
  }

  .last-prop {
    bottom: -0.565rem;
  }

  .last-prop:before {
    margin-top: 52px;
  }
`;

export const PopSingleStyle = styled.div`
  position: relative;
  cursor: pointer;

  div /* primeira div */ {
    position: absolute;
    width: -webkit-fill-available;
    min-width: min-content;
    height: fit-content;
    min-height: 45px;
    bottom: -0.5rem;
    left: 26.99825px;
    background-color: #fff;
    color: #1c496a;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
    border: none;
    box-sizing: border-box;
    padding: 8pt 12pt;
    text-align: center;

    p {
      cursor: pointer;
      margin: 0;
      font-size: 0.875rem;
      line-height: 2rem;
    }
  }

  div:before {
    content: '';
    position: absolute;
    left: 0;
    top: 22%;
    width: 14px;
    height: 2px;
    border: 11px solid transparent;
    border-right-color: #fff;
    border-left: 0;
    margin-top: 7px;
    margin-left: -11px;
  }
`;
