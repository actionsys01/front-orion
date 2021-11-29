import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { RadioFilterComponent } from "./style"
import { Radio, RadioGroup,
    FormControlLabel,FormControl} from "@material-ui/core";

const RadioFilter = () => {
    const [radioValue, setRadioValue] = useState("Todos");


    return <RadioFilterComponent>
                <FormControl component="fieldset">
                    <RadioGroup row
                            aria-label="control"
                            name="row-radio"
                            value={radioValue}
                            onChange={(e) => setRadioValue(e.target.value)}>
                        <FormControlLabel value="Todos" 
                            control={<Radio />} label="Todos" />
                        <FormControlLabel value="Na Portaria" 
                            control={<Radio />} label="Na Portaria" />
                        <FormControlLabel value="Autorizado" 
                            control={<Radio />} label="Autorizado" />
                        <FormControlLabel value="Fechado" 
                            control={<Radio />} label="Fechado" />
                        <FormControlLabel value="Cancelado" 
                            control={<Radio />} label="Cancelado" />
                    </RadioGroup>
                </FormControl>

    </RadioFilterComponent>
}

export default RadioFilter