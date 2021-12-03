import React, { useState } from 'react'
import { PopStyle, PopBackground } from './style'
import { BsThreeDots } from "react-icons/bs";

const NfsePopover = (props: any) => {
    
    const [visible, setVisible] = useState(false);

    const visibleHandler = () => {
        setVisible(!visible)
    }

    return <>
            <PopStyle /* onMouseLeave={() => setVisible(false)} */>
                <BsThreeDots onClick={visibleHandler} /> 
                {visible && 
                <div /* onMouseLeave={() => setVisible(false)} */>
                    {props?.content?.map((item: any, i: any) => (
                        <p key={i} onClick={item.onClick}>{item.optionName}</p>
                    ))}   
                </div>}
            </PopStyle>
        </>
}

export default NfsePopover
