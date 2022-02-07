import styled from 'styled-components';

export const Menu = styled.div`
    .style {
        header {
            height: 37.3px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            vertical-align: middle;
            background-color: #21232e;

            div {
                color: #1ad4ff;
            }
            .active {
                background-color: #fff;
                padding: 8.7px;
                padding-inline: 30px;
            }
            .active::after {
                display: none;
            }
        }
    }
`;
