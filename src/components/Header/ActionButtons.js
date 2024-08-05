import React from 'react';
import { Button, Grid } from '@mui/material';

const ActionButtons = () => {
  return (
    <>
      <Grid item xs={12} sm={12} md={2}>
        <Button variant="contained" color="primary" fullWidth sx={{ marginRight: 1 }}>
          Search
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={2}>
        <Button variant="outlined" color="secondary" fullWidth>
          Filters
        </Button>
      </Grid>
    </>
  );
};

export default ActionButtons;
