import React, { useRef, useEffect } from 'react';
import ReactSelect, {
    OptionTypeBase,
    Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
    name: string;
}

export default function SelectCompare({ name, options, ...rest }: Props) {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref: any) => {
                // console.log('aqui pt I');
                if (rest.isMulti) {
                    // console.log('aqui pt II');
                    if (!ref.state.value) {
                        // console.log('aqui pt III');
                        return [];
                    }
                    return ref.state.value.map(
                        (option: OptionTypeBase) => option.value,
                    );
                }
                if (!ref.state.value) {
                    // console.log('aqui pt IV');
                    return '';
                }
                return ref.state.value.value;
            },
            setValue: (ref, value) => {
                // console.log('aqui pt V');
                ref.select.setValue(value || null);
            },
            clearValue: ref => {
                ref.select.clearValue();
            },
        });
    }, [fieldName, registerField, rest.isMulti]);

    return (
        <ReactSelect
            defaultValue="equal"
            placeholder="="
            ref={selectRef}
            classNamePrefix="select-container"
            options={options}
            {...rest}
        />
    );
}
