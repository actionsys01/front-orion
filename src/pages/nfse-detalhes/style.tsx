import styled from "styled-components";

export const NfseDetailStyle = styled.div`
        height: 37.3px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        vertical-align: middle;
        background-color: #21232E;

    ul {
        color: #1AD4FF;
        display: flex;
        gap: 5rem;
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
     .active{
      
      background-color: #fff;
      padding: 8.7px;
      padding-inline: 30px;
    }
    .active::after {
      display: none;
    }
  
`

export const NfseCardStyle = styled.div`
  width: 100%;
  /* height: 8rem; */
  padding-top: .625rem;
  box-sizing: border-box;
  white-space: nowrap;

  > div {
    padding: 10px;
    background-color: #ebebeb;
    width: 100%;
    height: 100%;

    > div {
      display: flex;
      gap: 3rem;
    }

    h5 {
      margin: 0;
    }

    h6 {
      font-weight: 400;
    }
  }

  @media (max-width: 1020px) {
    > div {
      > div {
        /* flex-direction: column; */
        gap: 1rem;
      }
    }
}

  @media (max-width: 910px) {
    > div {
      > div {
        flex-direction: column;
        
      }
    }
  }
`

