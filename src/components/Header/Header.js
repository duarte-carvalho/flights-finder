import { Typography, Box, Grid } from '@mui/material';
import LocationInput from './LocationInput';
import DatePickerInput from './DatePickerInput';
import ActionButtons from './ActionButtons';

const Header = ({ from, setFrom, to, setTo, departureDate, setDepartureDate, returnDate, setReturnDate, handleSearch }) => {
  return (
    <Box sx={{ padding: 10 }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>Flights</Typography>
      <Box sx={{ marginTop: 5, borderRadius: 2, padding: 2, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <LocationInput
              label="From"
              value={from}
              onChange={setFrom}
              isFrom={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocationInput
              label="To"
              value={to}
              onChange={setTo}
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
          <ActionButtons handleSearch={handleSearch} />
        </Grid>
      </Box>
    </Box>
  );
};

export default Header;
