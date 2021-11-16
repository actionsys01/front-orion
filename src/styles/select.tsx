import styled from "styled-components"

export const Select = styled.div`
    select {
    max-width: 100%;
    display: inline-block;
    align-items: center;
    user-select: none;
    white-space: nowrap;
    position: relative;
    cursor: pointer;
    max-width: 80vw; 
    width: 100%;
    overflow: hidden;
    transition: border 0.2s ease 0s,color 0.2s ease-out 0s; 
    border: 1px solid #eaeaea;
    border-radius: 5px;
    padding: 0 4pt 0 8pt;
    height: calc(1.688 * 16pt);
    min-width: 10rem;
    background-color: #fff;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-bottom: 15px;
} 
`