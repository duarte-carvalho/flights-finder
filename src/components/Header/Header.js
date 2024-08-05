// src/components/Header.js
import React, { useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LocationInput from './LocationInput';
import DatePickerInput from './DatePickerInput';
import ActionButtons from './ActionButtons';

const Header = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: 10 }}>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>Flights</Typography>
        <Box sx={{ marginTop: 5, borderRadius: 2, padding: 2, display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <LocationInput
                label="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                isFrom={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <LocationInput
                label="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                isFrom={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePickerInput
                label="Departure"
                value={departureDate}
                onChange={setDepartureDate}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePickerInput
                label="Return"
                value={returnDate}
                onChange={setReturnDate}
              />
            </Grid>
            <ActionButtons />
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Header;
