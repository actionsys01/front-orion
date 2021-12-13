import styled from "styled-components";

export const FullPage = styled.div`
    /* height: auto; */
    /* display: flex; */
    /* flex-direction: column; */
`

export const TabStyle = styled.div`
    width: 100%;
    /* height: 8rem; */
    padding-top: .625rem;
    box-sizing: border-box;
    

    > div {
        padding: 10px;
        background-color: #ebebeb;
        width: 100%;
        box-sizing: border-box;
        /* height: 100%; */


        > div {
            display: flex;
            gap: 3rem;
            
            > div {
                min-width: 45px;
                /* margin-right: 11px; */
            }
        }


        h5 {
        margin: 0;
        }

        h6 {
        font-weight: 400;
        }
    }

    .second-row {
        gap: 3rem;

        > div:first-child {
            margin-right: 15px;
        }
      
    }

    @media (max-width: 800px) {
        .second-row {
            gap: 1.5rem;
        }
        > div {
            > div {
                gap: 1.5rem;

                /* > div {
                    min-width: 45px;
                } */
            }
        }
    }

    @media (max-width: 660px) {
        > div {
            > div {
               flex-direction: column;
            }
        }
    }
`

export const DadosStyle = styled.div`
    width: 100%;
    /* height: 8rem; */
    padding-top: .625rem;
    box-sizing: border-box;

    > div {
        padding: 10px;
        background-color: #ebebeb;
        width: 100%;

    
    }

    .header {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }
`

export const LineStyle = styled.div` 
    display: flex;
    gap: 3rem;
    margin: 1rem 0;
    box-sizing: border-box;

          > div {
        }


        h5 {
        margin: 0;
        }

        h6 {
        font-weight: 400;
        }

    @media (max-width: 900px) {
        gap: 1.5rem;
    }

    @media (max-width: 775px) {
        flex-direction: column;
    }
`


// @media (max-width: 1020px) {
//     > div {
//       > div {
//         /* flex-direction: column; */
//         gap: 1rem;
//       }
//     }
// }

//   @media (max-width: 910px) {
//     > div {
//       > div {
//         flex-direction: column;
        
//       }
//     }
//   }