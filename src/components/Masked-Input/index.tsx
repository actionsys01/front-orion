import React from 'react';
import InputMask from 'react-input-mask';

const MaskedInput = ({ value, onChange }) => {
  return (
    <>
      <InputMask mask="99.999.999/9999-99" value={value} onChange={onChange} />
    </>
  );
};

export default MaskedInput;
