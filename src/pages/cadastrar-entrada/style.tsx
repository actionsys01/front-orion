import styled from "styled-components";

export const EntranceRegisterStyle = styled.div`

    .outside-label {
        margin: 0 95px;
    }

     .content   {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 15px;

        .container {
        border: 1px solid rgba(151, 151, 151, .45);
        width: 85%;
        display: flex;
        align-items: center;
        padding: 10px;

        .label {
            display: flex;
            border: none;
            color: #444;
            margin: 0 20px;
            white-space: nowrap;
     }

    


            .input-style  {
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
            }

            .input-style-medium {
                vertical-align: middle;
                height: 35px;
                width: 35%;
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
            }

            .row {
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: flex-start;

                .input-style-small {
                    vertical-align: middle;
                    height: 35px;
                    width: 12%;
                    border-radius: 5px;
                    border: 1px solid #eaeaea;
                    margin: 7px 10px;

                    input {
                        margin: 5px 10px;
                        padding:0;
                        box-shadow: none;
                        font-size: .875rem;
                        background-color: transparent;
                        border: none;
                        color: #1c496a;
                        outline:  none;
                        border-radius: 0;
                    }
                }
            }
        }
    }

    .deliver-btn {
        font-size: 0.85rem;
        margin: 7px 10px;
    }

    @media (max-width: 1023px) {
       color:red;

       .input-style-medium {
        border: 1px solid red;
       }
    }
`