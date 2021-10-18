import React, { useState } from 'react'
import { PopStyle } from './style'
import { BsThreeDots } from "react-icons/bs";

const Popover = () => {
    const [visible, setVisible] = useState(false);
    const [secondVisible, setSecondVisible] = useState(false)

    const visibleHandler = () => {
        setVisible(!visible)
    }

    return <>
            <PopStyle>
                <BsThreeDots onClick={visibleHandler} /> 
                {visible && 
                <div onMouseLeave={() => setVisible(false)}>
                    <p>Editar</p>
                    <p>Deletar</p>
                </div>}
            </PopStyle>
        </>
}

export default Popover
