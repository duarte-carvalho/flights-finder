import { useState, useEffect } from 'react';

import { Typography, Box, Grid } from '@mui/material';

import LocationInput from './LocationInput';
import DatePickerInput from './DatePickerInput';
import ActionButtons from './ActionButtons';

import { fetchAirportsData } from '../../utils/airports';

const Header = ({ from, setFrom, to, setTo, departureDate, setDepartureDate, returnDate, setReturnDate, handleSearch, handleApplyFilters, isLoading }) => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAirports = async () => {
      try {
        const data = await fetchAirportsData();
        setAirports(data);
      } catch (error) {
        console.error('Error fetching airports data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAirports();
  }, []);

  return (
    <Box sx={{ padding: 10 }}>
      <Typography variant="h3" sx={{ marginBottom: 2, textAlign: 'left' }}>Find your next destination</Typography>
      <Box sx={{ marginTop: 5, borderRadius: 2, padding: 2, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <LocationInput
              label="From"
              value={from}
              onChange={setFrom}
              airports={airports}
              loading={loading}
              isFrom={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocationInput
              label="To"
              value={to}
              onChange={setTo}
              airports={airports}
              loading={loading}
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
          <ActionButtons handleSearch={handleSearch} handleApplyFilters={handleApplyFilters} isLoading={isLoading} />
        </Grid>
      </Box>
    </Box>
  );
};

export default Header;
