import styled from "styled-components";

export const AltInputStyle = styled.div`
    display: flex;
    box-sizing: border-box;
    justify-content: center;

    > div {

        padding: .5rem 1rem;
        

        input, label, select {
            display: block;
        }

        label {
            font-size: .8rem;
        }
        
        input { 
            height: 28px;
            border: 1px solid #eaeaea;
            max-width: 250px;
            width: 100%;
        }

        select {
            height: 28px;
            border: 1px solid #eaeaea;
            min-width: 250px;
            width: 100%;
        }
    }
    
    > div:nth-child(3) {
        position: relative;

            svg {
                position: absolute;
                left: 0;
                top: 30px;
                cursor: pointer;
            }
    }
`

export const ModalContent = styled.div`
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    min-height: 275px;
    
`