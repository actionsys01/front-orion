import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  defaultValue: {
    value: string | number;
    label: string;
  };
}

export default function SelectCompare({
  name,
  options,
  defaultValue,
  ...rest
}: Props) {
  const selectRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
      clearValue: ref => {
        ref.select.clearValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <ReactSelect
      defaultValue={{
        label: 'Igual',
        value: 'equal',
      }}
      placeholder="Igual"
      ref={selectRef}
      classNamePrefix="select-container"
      options={options}
      {...rest}
    />
  );
}
