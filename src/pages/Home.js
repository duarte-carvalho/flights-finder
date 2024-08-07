import React, { useState } from 'react';
import Header from "../components/Header/Header";
import { Container } from '@mui/material';

const Home = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
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
        </Container>
    );
};

export default Home;