import React, { useRef, useEffect, useState } from "react";
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from "react-select";
import { useField } from "@unform/core";
import { useControlFilter } from "@contexts/ControlFilter";

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

export default function Select({ name, options, ...rest }: Props) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const { setIsStatusSelected } = useControlFilter();
  const [ fieldStatus, setFieldStatus ] = useState("")

  function getField(field) {
      console.log(`e?.value`, field)
    if(field === "status") {
      console.log("foi foi foi")
      setIsStatusSelected(true)
    } if (field != "status") {
        setIsStatusSelected(false)
    }
  }

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
          return "";
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
      clearValue: (ref) => {
        ref.select.clearValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <ReactSelect
      defaultValue={
        defaultValue && options.find((option) => option.value === defaultValue)
      }
      onChange={(e: any) => getField(e?.value)}
      ref={selectRef}
      classNamePrefix="react-select"
      options={options}
      {...rest}
    />
  );
}
