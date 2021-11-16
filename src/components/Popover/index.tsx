import React, { useState } from 'react'
import { PopStyle } from './style'
import { BsThreeDots } from "react-icons/bs";

const Popover = (props: any) => {
    
    const [visible, setVisible] = useState(false);

    const visibleHandler = () => {
        setVisible(!visible)
    }

    return <>
            <PopStyle>
                <BsThreeDots onClick={visibleHandler} /> 
                {visible && 
                <div onMouseLeave={() => setVisible(false)}>
                    {props?.content?.map((item: any, i: any) => (
                        <p key={i} onClick={item.onClick}>{item.optionName}</p>
                    ))}
                    
                </div>}
            </PopStyle>
        </>
}

export default Popover
