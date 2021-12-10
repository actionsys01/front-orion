import styled from "styled-components";

export const SelectStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 25px;
  input[type= "month" ] {
    width: 195px;
    height: 30px;
    border: 1px solid #eaeaea;
    text-align: center;
    font-size: .9rem;
    padding: .2rem;
}
input[type= "month" ]::-webkit-calendar-picker {
  background-color: orange;
}

`

export const Speedometer = styled.div`
  display: flex;
  gap: 3rem;

  > div {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;

    span { 
      display: flex;
      justify-content: center;
      position: relative;
      width: auto;
      h5 {
        position: absolute;
        top: 6rem;
        white-space: nowrap;
        font-weight: 400;
      }
    }
  }
  
  h3, h5 {
    color: #444;
  }

  @media (max-width: 860px) {
    flex-direction: column;
    gap: 10rem;
  }
`

export const InfoContainer = styled.div`
  display: flex;
  height: 30%;
  gap: 7rem;
  white-space: nowrap;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;

  > div:nth-child(2) {
    box-sizing: border-box;
    width: 28%;
    white-space: nowrap;
    height: 100%;
    
    > div {
      p {
        text-overflow: visible ;
        /* width: 35%; */
      }
    }
  }

  > div {
    display: flex;
    gap: 3rem;

    
     > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;

    }

    p {
      white-space: normal;
      margin: 1.5rem 0;
      padding: 0 2rem;
      -webkit-user-modify: read-write-plaintext-only;
    }

    svg {
      font-size: 2rem;
    }
  }

  h3 {
    color: #444;
  }

  @media (max-width: 860px) {
    gap: 2rem;
    width: 100%;
  }

  @media (max-width: 1090px) {
   flex-direction: column;
   height: fit-content;
  }
`