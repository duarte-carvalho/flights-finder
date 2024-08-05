import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePickerInput = ({ label, value, onChange }) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} fullWidth />}
    />
  );
};

export default DatePickerInput;
