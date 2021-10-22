import styled from "styled-components";

export const PopStyle = styled.div`
    position: relative;
    cursor: pointer;
    div /* primeira div */ {
    position: absolute;
    width: -webkit-fill-available;
    min-width: 85px;
    height: fit-content;
    bottom: -1.865rem;
    left: 24.89825px;
    background-color: #fff;
    color: #1c496a;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
    border: none;
    box-sizing: border-box;
    padding: 8pt 0;
    text-align: center;
    
        p {
            cursor: pointer;
            margin: 0;
            font-size: 0.875rem;
            line-height: 2rem;
        }
}
`