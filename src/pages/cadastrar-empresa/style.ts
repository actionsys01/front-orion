import styled from "styled-components";

export const CompanyRegister = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 8px;
   
   div {
    width: 500px;
    height: 425px;
    border: 1px solid rgba(151, 151, 151, .45);

    .container {
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
            width: 100%;
        }
   }
   }
        select {
            max-width: 100%;
            display: inline-block;
            align-items: center;
            user-select: none;
            white-space: nowrap;
            position: relative;
            cursor: pointer;
            max-width: 80vw; 
            width: 75%;
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
            margin:  7px 10px;
 
} 

   }
`