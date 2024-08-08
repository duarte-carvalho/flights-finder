import React, { useState } from 'react';
import Header from "../components/Header/Header";
import FlightOptions from '../components/FlightOptions/FlightOptions';
import { Container } from '@mui/material';
import { fetchSearchResults } from '../utils/api';

const Home = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        const results = await fetchSearchResults(from, to, departureDate, returnDate);
        setSearchResults(results);
    };

    return (
        <Container>
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
            />
            <FlightOptions departureFlights={searchResults} arrivalFlights={searchResults} />
        </Container>
    );
};

export default Home;
