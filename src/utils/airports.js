import Papa from 'papaparse';

export const fetchAirportsData = async () => {
  try {
    const response = await fetch('/flights-finder/data/airports.csv');
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const formattedData = results.data.map(row => ({
            name: row[0],
            city: row[1],
            country: row[2],
            iata: row[3]
          }));
          resolve(formattedData);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error('Error loading airport data:', error);
    throw error;
  }
};