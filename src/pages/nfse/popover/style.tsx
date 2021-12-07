import styled from "styled-components";

export const PopStyle = styled.div`
    position: relative;
    cursor: pointer;
    z-index: 1000!important;

    div /* primeira div */ {
    position: absolute;
    width: -webkit-fill-available;
    min-width: 135px;
    height: fit-content;
    min-height: 90px;
    bottom: -4.865rem;
    left: 30.89825px;
    background-color: #fff;
    color: #1c496a;
    border-radius: 5px;
    z-index: 1000!important;
    box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
    border: none;
    box-sizing: border-box;
    padding: 8pt;
    text-align: center;
    
        p { 
            cursor: pointer;
            margin: 0;
            font-size: 0.875rem;
            line-height: 2rem;
        }

    /* div {
        clip-path: polygon(20% 0, 100% 0%, 100% 75%, 20% 75%, 20% 43%, 13% 38%, 20% 33%);
    } */
}

div:before {
    content: '';
	position: absolute;
	left: 0;
	top: 42%;
	width: 14px;
	height: 2px;
	border: 11px solid transparent;
	border-right-color: #fff;
	border-left: 0;
	margin-top: -17px;
	margin-left: -11px;
}
    .beforeLast-prop {
            bottom: -1.565rem;
    }

    .beforeLast-prop:before {
        margin-top: 36px;
    }

    .last-prop {
            bottom: -.565rem;
    }

    .last-prop:before {
        margin-top: 52px;
    }
`

export const PopBackground = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;