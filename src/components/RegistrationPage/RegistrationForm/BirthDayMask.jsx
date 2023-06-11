import React, { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

const BirthDayMask = (props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="00.00.0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
};

export default forwardRef(BirthDayMask);
