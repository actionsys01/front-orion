import React, { useState } from 'react'
import { PopStyle, PopBackground } from './style'
import { BsThreeDots } from "react-icons/bs";

const NfsePopover = (props: any) => {
    // console.log(`props`, props.num )
    const [visible, setVisible] = useState(false);

    const visibleHandler = () => {
        setVisible(!visible)
    }

    return <>
            <PopStyle >
                <BsThreeDots onClick={visibleHandler} /> 
                {visible && 
                <div onMouseLeave={() => setVisible(false)} className={props.num === 7 ? "last-prop" : props.num === 6 ? "beforeLast-prop" : ""}>
                    {props?.content?.map((item: any, i: any) => (
                        <p key={i} onClick={item.onClick}>{item.optionName}</p>
                    ))}   
                </div>}
            </PopStyle>
        </>
}

export default NfsePopover
