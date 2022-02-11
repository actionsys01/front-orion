import React from 'react';
import InputMask from 'react-input-mask';

const MaskedInputDate = ({ value, onChange }) => {
  return (
    <>
      <InputMask mask="99/99/9999" value={value} onChange={onChange} />
    </>
  );
};

export default MaskedInputDate;
