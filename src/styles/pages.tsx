import styled from "styled-components"

export const Pages = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 10px;
ul li::before {
   display: none;
}
.MuiPaginationItem-root {
    color: #0DD0B3
}
.MuiPaginationItem-page.Mui-selected {
    background-color: #0DD0B3;
    color: white
}

`