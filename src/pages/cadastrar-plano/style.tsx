import styled from "styled-components";

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 2px;
   
   div {
    width: 500px;
    height: 325px;
    border: 1px solid rgba(151, 151, 151, .45);
   }

 .container  {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     border: none;
     
     
     .label {
            position: relative;
            display: flex;
            height: 20px;
            border: none;
         h6 {
            position: absolute;
            left: 75px;
         }
     }

       .input-style  {
            display: flex;
            flex-direction: column;
            align-items: center;
            vertical-align: middle;
            height: 35px;
            width: 75%;
            border-radius: 5px;
            border: 1px solid #eaeaea;
            margin: 7px 10px;

        input {
            margin: 4px 10px;
            padding:0;
            box-shadow: none;
            font-size: .875rem;
            background-color: transparent;
            border: none;
            color: #1c496a;
            outline:  none;
            border-radius: 0;
            
        }
   }}

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