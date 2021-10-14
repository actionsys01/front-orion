import styled from "styled-components";

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
   
   div {
    width: 500px;
    height: 325px;
    border: 1px solid rgba(151, 151, 151, .45);
   }


 .container  {
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     justify-content: flex-start;
     margin: 20px 30px;
     border: none;
     
     h6 {
         margin: 5px 15px;
     }

       .input-style  {
            vertical-align: middle;
            height: 35px;
            width: 75%;
            border-radius: 5px;
            border: 1px solid #eaeaea;
            margin: 0 10px;

        input {
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

/* export const InputStyle = styled.div`

.input-style  {
    vertical-align: middle;
    height: 35px;
    width: 75%;
    border-radius: 5px;
    border: 1px solid red;
    display: flex;
    justify-content: center;


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
` */