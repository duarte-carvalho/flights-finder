// src/components/LocationInput.js
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress, InputAdornment, createFilterOptions } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { fetchAirportsData } from '../../utils/airports';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 50, 
  stringify: (option) => `${option.name} ${option.city} ${option.country} ${option.iata}`
});

const LocationInput = ({ label, value, onChange, isFrom }) => {
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
    <Autocomplete
      freeSolo
      options={airports}
      getOptionLabel={(option) => option.name ? `${option.name} (${option.iata})` : option}
      loading={loading}
      filterOptions={filterOptions}
      onChange={(_, newValue) => { newValue && newValue.iata && typeof(newValue.iata) === "string" ? onChange(newValue.iata) : onChange('')}}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {isFrom ? <RadioButtonUncheckedIcon sx={{ fontSize: 15 }} /> : <LocationOnIcon sx={{ fontSize: 20 }} />}
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.iata ? `${option.iata}-${option.name}` : option}>
          {option.name ? `${option.name} (${option.iata}) - ${option.city}, ${option.country}` : option}
        </li>
      )}
    />
  );
};

export default LocationInput;
