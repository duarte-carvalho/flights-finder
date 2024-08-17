import { useState } from 'react';
import { Button, Grid, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Slider, Typography, CircularProgress } from '@mui/material';

const ActionButtons = ({ handleSearch, handleApplyFilters, isLoading }) => {
  const [open, setOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const [stops, setStops] = useState('');
  const [outboundTime, setOutboundTime] = useState([0, 23]);
  const [returnTime, setReturnTime] = useState([0, 23]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    handleApplyFilters({ maxPrice, stops, outboundTime, returnTime });
    handleClose();
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={2}>
        <Button variant="contained" color="primary" fullWidth sx={{ marginRight: 1 }} onClick={handleSearch} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={2}>
        <Button variant="outlined" color="secondary" fullWidth onClick={handleClickOpen}>
          Filters
        </Button>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter Flights</DialogTitle>
        <DialogContent>
          <TextField
            label="Max Price"
            type="number"
            fullWidth
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Stops"
            select
            fullWidth
            value={stops}
            onChange={(e) => setStops(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="0">Any number of stops</MenuItem>
            <MenuItem value="1">Non-stop</MenuItem>
            <MenuItem value="2">1 Stop</MenuItem>
            <MenuItem value="3">2+ Stops</MenuItem>
          </TextField>
          <Typography>Outbound Time Range</Typography>
          <Slider
            value={outboundTime}
            onChange={(e, newValue) => setOutboundTime(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={23}
            marks
            sx={{ mb: 2 }}
          />
          <Typography>Return Time Range</Typography>
          <Slider
            value={returnTime}
            onChange={(e, newValue) => setReturnTime(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={23}
            marks
            sx={{ mb: 2 }}
          />
          <Button onClick={handleApply} variant="contained" color="primary" fullWidth>
            Apply Filters
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionButtons;