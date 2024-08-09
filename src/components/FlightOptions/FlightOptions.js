import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Avatar, Button, Collapse, Divider, Tabs, Tab } from '@mui/material';
import { FlightLand, FlightTakeoff } from '@mui/icons-material';

const truncateAirportName = (name, maxLength = 27) => {
  return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
};

const FlightOptions = ({ departureFlights, arrivalFlights }) => {
  const [expanded, setExpanded] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const handleExpandClick = (index) => {
    setExpanded(prev => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const renderFlights = (flights) => (
    flights.map((result, index) => (
      <Card key={index} sx={{ marginBottom: 4, borderRadius: 2, boxShadow: 3, padding: 2 }}>
        <CardContent sx={{ padding: 5, position: 'relative' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              {result.flights.map((flight, idx) => (
                <React.Fragment key={idx}>
                  {/* Horizontal layout for xl and above */}
                  <Grid container spacing={2} alignItems="center" textAlign={'left'} sx={{ mb: 2, display: { xs: 'none', xl: 'flex' } }}>
                    <Grid item xs={1} sx={{ textAlign: 'center' }}>
                      <Avatar alt={flight.airline} src={flight.airline_logo} sx={{ width: 40, height: 40, margin: 'auto' }} />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1" component="div" noWrap>
                        <Box fontWeight="fontWeightBold" display="inline">
                          {new Date(flight.departure_airport.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Box>{' '} - {' '}
                        <Box component="span" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block', verticalAlign: 'bottom' }}>
                          {truncateAirportName(flight.departure_airport.name)}
                        </Box>
                        {' '}({flight.departure_airport.id})
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: 'center' }}>
                      <FlightTakeoff sx={{ fontSize: 18 }} />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1" component="div" noWrap>
                        <Box fontWeight="fontWeightBold" display="inline">
                          {new Date(flight.arrival_airport.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Box>{' '} - {' '}
                        <Box component="span" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block', verticalAlign: 'bottom' }}>
                          {truncateAirportName(flight.arrival_airport.name)}
                        </Box>
                        {' '}({flight.arrival_airport.id})
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="textSecondary">
                        {Math.floor(flight.duration / 60)} hr {flight.duration % 60} min
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Vertical layout for xs, sm, md, lg (logos removed and layovers hidden in main view) */}
                  <Grid container spacing={2} sx={{ mb: 2, display: { xs: 'block', xl: 'none' } }}>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                      <Typography variant="body1" component="div" noWrap>
                        <Box fontWeight="fontWeightBold" display="inline">
                          {new Date(flight.departure_airport.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Box>{' '} - {' '}
                        <Box component="span" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block', verticalAlign: 'bottom' }}>
                          {truncateAirportName(flight.departure_airport.name)}
                        </Box>
                        {' '}({flight.departure_airport.id})
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', my: 2 }}>
                      <FlightTakeoff sx={{ fontSize: 18 }} />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                      <Typography variant="body1" component="div" noWrap>
                        <Box fontWeight="fontWeightBold" display="inline">
                          {new Date(flight.arrival_airport.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Box>{' '} - {' '}
                        <Box component="span" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block', verticalAlign: 'bottom' }}>
                          {truncateAirportName(flight.arrival_airport.name)}
                        </Box>
                        {' '}({flight.arrival_airport.id})
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        {Math.floor(flight.duration / 60)} hr {flight.duration % 60} min
                      </Typography>
                    </Grid>
                    {idx < result.flights.length - 1 && (<Divider sx={{ mt: 4, mb: 4 }} orientation="horizontal" flexItem />)}
                  </Grid>

                  {/* Layovers will only be displayed in xl and above in the main view */}
                  {idx < result.flights.length - 1 && result.layovers[idx] && (
                    <Grid item xs={12} sx={{ mt: 4, mb: 4, display: { xs: 'none', xl: 'block' } }}>
                      <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
                        Layover: {result.layovers[idx]?.name} ({result.layovers[idx]?.duration} min)
                      </Typography>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
          <Box textAlign="center" mt={2}>
            <Button
              variant="text"
              color="primary"
              onClick={() => handleExpandClick(index)}
            >
              {expanded[index] ? 'Show Less' : 'Show More'}
            </Button>
          </Box>
          <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
            <Box mt={2}>
              <Divider />
              <Box mt={2}>
                {result.flights.map((flight, idx) => (
                  <React.Fragment key={idx}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {flight.extensions.join(', ')}
                    </Typography>
                    {/* Layovers in expanded view will be displayed in all breakpoints */}
                    {idx < result.flights.length - 1 && result.layovers[idx] && (
                      <Box mt={4}>
                        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                          Layover: {result.layovers[idx]?.name} ({result.layovers[idx]?.duration} min)
                        </Typography>
                      </Box>
                    )}
                  </React.Fragment>
                ))}
                <Box mt={2} textAlign="center">
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Total duration: <Box component="span" fontWeight="fontWeightBold">{Math.floor(result.total_duration / 60)} hr {result.total_duration % 60} min</Box>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    CO2 emissions: <Box component="span" fontWeight="fontWeightBold">{result.carbon_emissions.this_flight / 1000} kg</Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
          <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
            <Typography variant="h6" color="primary">
              €{result.price}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    ))
  );
  
  return (
    <Box>
      {(departureFlights.length > 0 || arrivalFlights.length > 0) && (
        <>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{ marginBottom: 4 }}
          >
            <Tab label="Departure Flights" />
            <Tab label="Arrival Flights" />
          </Tabs>
          {tabValue === 0 && renderFlights(departureFlights)}
          {tabValue === 1 && renderFlights(arrivalFlights)}
        </>
      )}
    </Box>
  );
};

export default FlightOptions;
