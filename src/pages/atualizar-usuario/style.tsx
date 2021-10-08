import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 10px;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    justify-content: center;
    vertical-align: middle;
    display: flex;
    position: relative;
    box-sizing: border-box;
    margin-left: calc(0 * 16pt / 2);
    margin-right: calc(0 * 16pt / 2);
    row-gap: calc(0 * 16pt);
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
    text-align: center;
    width: 100%;
    font-size: 3rem;
    letter-spacing: 0.066875rem;
    line-height: 3rem;
    font-weight: 700;
    margin: 0 0 0.625rem 0;
    color: #1C496A;
}
` 

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
    transition: border 0.2s ease 0s,color 0.2s ease-out 0s, box-shadow 0.2s ease 0s;
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

export const InputStyle = styled.div`

display: inline-flex;
align-items: center;
width: 100%;
height: calc(1.687 * 16pt);
margin-bottom: 15px;

div /* 2 */ {
display: inline-flex;
vertical-align: middle;
align-items: center;
height: 100%;
flex: 1;
user-select: none;
border-radius: 5px;
border: 1px solid #eaeaea;
transition: border 0.2 ease 0s, color 0.2s ease 0s;


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
    width: 100%;
    min-width: 0;
    
}
}
`
export const Button = styled.button`
    width: 100%;
    display: inline-block;
    padding: 0 1.375rem;
    height: 2.5rem;
    line-height: 2.5rem;
    min-width: 21.5rem;
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
    background-color: #1C496A;
    border: 1px solid #1C496A;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: none;

    div /* com texto ou icone */ {
        position: relative;
        z-index: 1;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        top: -1px;
    }
`

