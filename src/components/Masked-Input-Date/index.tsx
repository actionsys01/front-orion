import React, { useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';
import { useField } from '@unform/core';

interface IProps {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & IProps;

const MaskedInputDate = ({ name, label, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <InputMask mask="99/99/9999" alwaysShowMask={true} id={fieldName}>
        {inputProps => <input ref={inputRef} {...inputProps} {...rest} />}
      </InputMask>
    </>
  );
};

export default MaskedInputDate;
