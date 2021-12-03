import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { RadioFilterComponent } from "./style"
import { Radio, RadioGroup,
    FormControlLabel,FormControl} from "@material-ui/core";
import { useControlFilter } from "@contexts/ControlFilter";


const RadioFilter = () => {
    const [radioValue, setRadioValue] = useState("");
    const {registerFilter, filters } = useControlFilter();

    // function sendStatusData()  {
    //     console.log("veio aqui")
    //     let filtro = []
    //         if(radioValue === "Todos") {
    //             const campo = "status"
    //             const valor = null
    //             filtro.push({campo, valor})
    //             registerFilter([])
    //         } else {
    //             const campo = "status"
    //             const valor = radioValue
    //             filtro.push({campo, valor})
    //             registerFilter(filtro)
    //         }
        
    //     // console.log(`filtro no comp novo`, filtro )
    //     return filtro
    // }

    const sendStatusData = useCallback(() => {
        console.log("veio aqui")
        let filtro = []
            if (radioValue === "") {
                return
            } 
            if (radioValue === "Todos") {
                const campo = "status"
                const valor = null
                filtro.push({campo, valor})
                registerFilter([])
            } 
             else {
                const campo = "status"
                const valor = radioValue
                filtro.push({campo, valor})
                registerFilter(filtro)
            }
        
        // console.log(`filtro no comp novo`, filtro )
        return filtro
    }, [radioValue])

    useEffect(() => {
        sendStatusData() 
    }, [radioValue])

    // console.log(`radioValue`, radioValue)
    return <RadioFilterComponent>
                <FormControl component="fieldset">
                    <RadioGroup row
                            aria-label="control"
                            name="row-radio"
                            value={radioValue}
                            onChange={(e) => setRadioValue(e.target.value)}>
                        <FormControlLabel value="Todos" 
                            control={<Radio />} label="Todos" />
                        <FormControlLabel value="0" 
                            control={<Radio />} label="Na Portaria" />
                        <FormControlLabel value="1" 
                            control={<Radio />} label="Autorizado" />
                        <FormControlLabel value="2" 
                            control={<Radio />} label="Fechado" />
                        <FormControlLabel value="4" 
                            control={<Radio />} label="Cancelado" />
                    </RadioGroup>
                </FormControl>

    </RadioFilterComponent>
}

export default RadioFilter