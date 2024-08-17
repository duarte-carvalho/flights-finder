import { useState } from 'react';

import Header from "../components/Header/Header";
import FlightOptions from '../components/FlightOptions/FlightOptions';

import { Container, Typography } from '@mui/material';

import { fetchFlightData } from '../utils/api';

import dayjs from 'dayjs';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [filters, setFilters] = useState({});
    const [noResults, setNoResults] = useState(false);
    const [error, setError] = useState('');
    const [departureFlights, setDepartureFlights] = useState([]);
    const [arrivalFlights, setArrivalFlights] = useState([]);

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSearch = async () => {
        if (!from || !to || !departureDate || !returnDate || !dayjs(departureDate).isValid() || !dayjs(returnDate).isValid() || dayjs(returnDate).isBefore(dayjs(departureDate))) {
            setDepartureFlights([]); setArrivalFlights([]);
            setError('Please fill out all fields and select valid dates before searching.');
            setTimeout(() => setError(''), 3000);
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const [departureData, arrivalData] = await Promise.all([
                fetchFlightData(from, to, departureDate, filters.maxPrice, filters.stops, filters.outboundTime),
                fetchFlightData(to, from, returnDate, filters.maxPrice, filters.stops, filters.returnTime)
            ]);

            setDepartureFlights(departureData);
            setArrivalFlights(arrivalData);

            if ((departureData.length === 0 && arrivalData.length === 0) || (typeof (departureData) === 'string' && typeof (arrivalData) === 'string'))
                setNoResults(true);
            else setNoResults(false);

        } catch (error) {
            setError(`Error fetching flight data: ${error.message}`);
            setTimeout(() => setError(''), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        if (error) {
            return <Typography variant="body1" color="error" style={{ minHeight: '200px' }}>{error}</Typography>;
        }

        if (noResults) {
            return <Typography variant="body1" color="textSecondary" style={{ minHeight: '200px' }}>No results found.</Typography>;
        }

        return (
            <div className={departureFlights.length > 0 || arrivalFlights.length > 0 ? "results-container show" : "results-container"}>
                <FlightOptions departureFlights={departureFlights} arrivalFlights={arrivalFlights} noResults={noResults} />
            </div>
        );
    };

    return (
        <Container sx={{ paddingTop: 10 }}>
            <Header
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                handleSearch={handleSearch}
                handleApplyFilters={handleApplyFilters}
                isLoading={isLoading}
            />
            {renderContent()}
        </Container>
    );
};

export default Home;
