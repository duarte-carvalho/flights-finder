import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationInput = ({ label, value, onChange, isFrom }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {isFrom ? <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} /> : <LocationOnIcon sx={{ fontSize: 20 }} />}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default LocationInput;