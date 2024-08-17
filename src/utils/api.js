export const fetchFlightData = async (departure_id, arrival_id, outbound_date, max_price, stops, outbound_times) => {
    try {
        const body = {
            departure_id,
            arrival_id,
            outbound_date: outbound_date.format('YYYY-MM-DD')
        };

        if (max_price)
            body.max_price = max_price;

        if (stops)
            body.stops = stops;

        if (outbound_times)
            body.outbound_times = outbound_times.join(',');


        const response = await fetch('https://flights-data-api.vercel.app/api/google-flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data.best_flights || data.other_flights || data.error || [];
    } catch (error) {
        throw new Error(`${error.message}`);
    }
};
