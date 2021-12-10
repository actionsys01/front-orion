import React, { useState } from 'react'
import { PopStyle, PopStyleDouble, PopStyleFourLines } from './style'
import { BsThreeDots } from "react-icons/bs";

const Popover = (props: any) => {
    // console.log(`props`, props.num )
    // console.log(`props.quant`, props.quant)
    const [visible, setVisible] = useState(false);

    const visibleHandler = () => {
        setVisible(!visible)
    }


    if(props.quant === 2) {
        return <>
            <PopStyleDouble >
                <BsThreeDots onClick={visibleHandler} /> 
                {visible && 
                <div onMouseLeave={() => setVisible(false)} 
               /*  className={props.num === 7 ? "last-prop" : props.num === 6 ? "beforeLast-prop" : ""} */>
                    {props?.content?.map((item: any, i: any) => (
                        <p key={i} onClick={item.onClick}>{item.optionName}</p>
                    ))}
                    
                </div>}
            </PopStyleDouble>
        </>
    }

    if(props.quant === 4) {
        return <>
            <PopStyleFourLines >
                <BsThreeDots onClick={visibleHandler} /> 
                {visible && 
                <div onMouseLeave={() => setVisible(false)} 
                className={props.num === 7 ? "last-prop" : props.num === 6 ? "beforeLast-prop" : ""}>
                    {props?.content?.map((item: any, i: any) => (
                        <p key={i} onClick={item.onClick}>{item.optionName}</p>
                    ))}
                    
                </div>}
            </PopStyleFourLines>
        </>
    }
    return <>
            <PopStyle >
                <BsThreeDots onClick={visibleHandler} /> 
                {visible && 
                <div onMouseLeave={() => setVisible(false)} 
                className={props.num === 7 ? "last-prop" : props.num === 6 ? "beforeLast-prop" : ""}>
                    {props?.content?.map((item: any, i: any) => (
                        <p key={i} onClick={item.onClick}>{item.optionName}</p>
                    ))}
                    
                </div>}
            </PopStyle>
        </>
}

export default Popover
