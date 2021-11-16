import styled from "styled-components";

export const SelectStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 25px;
  select {
    margin: 10px;
    width:125px;
    height: 35px;
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
  height: 40%;
  gap: 7rem;
  white-space: nowrap;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;

  > div {
    display: flex;
    gap: 3rem;

    
     > div {
      display: flex;
      flex-direction: column;
      align-items: center;

    }

    p {
      white-space: normal;
      margin: 3rem 0;
      padding: 0 2rem;
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