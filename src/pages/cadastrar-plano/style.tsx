import styled from "styled-components";

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 2px;
   
   > div {
    width: 500px;
    height: 285px;
    border: 1px solid rgba(151, 151, 151, .45);
    padding: 1rem;
    gap: 10px;
   }

   > div {
            display: flex;
            flex-direction: column;
        }
        span {
                margin: 0 0.5rem;
                font-size: 0.9rem;
                white-space: nowrap;
                color: #444;
        }

        input {
            max-width: 450px;
            width: 100%;
            height: 28px;
            border: 1px solid #eaeaea;
        }

     
`
export const SmallInputs = styled.div`
    display: flex;
    justify-content: space-between;
`


export const Column = styled.div`
    display: flex;

    > div {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;

         span {
            margin: 0 0.5rem;
            font-size: 0.8rem;
            white-space: nowrap;
        }

     input {
            max-width: 280px;
            width: 90%;
            height: 28px;
            border: 1px solid #eaeaea;
        }

        @media (max-width: 980px) {
        flex-wrap: wrap;
    }
    }
`

export const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 500px;
        height: 165px;
        border: 1px solid rgba(151, 151, 151, .45);

        span {
            height: fit-content;

             h5 {
                margin: 5px;
                color: #444444;
                font-weight: 400;
        }
        }
       

        .row {
            display: flex;
            border: none;
            width: 400px;

            div {
                display: flex;
                flex-direction: row;
                align-items: center;
                border: none;
                margin: 10px 35px;

                h6 {
                   margin: 0;
                }

                span {
                       

                        .MuiSvgIcon-root {
                            font-size: 18px
                        }

                        .Mui-checked {
                            color: #1C496A;
                            
                            
                        }
                        
                    }
            }
        }
    }
`

export const ButtonStyle = styled.div`
    display: flex;
    position: relative;
    box-sizing: border-box;
    margin-left: calc(0 * 16pt / 2 );
    margin-right: calc(0 * 16pt / 2 );
    margin-top: 10px;
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
        transition: background-color 200ms ease 0ms,box-shadow 200ms ease 0ms, border 200ms ease 0ms,color 200ms ease 0ms;
        position: relative;
        overflow: hidden;
        color: #fff;
        background-color: #0DD0B3;
        border: 1px solid #0DD0B3;
        cursor: pointer;
        pointer-events: auto;
        box-shadow: none;
    }
`