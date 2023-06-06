import React, { useState } from 'react';
import { Autocomplete } from '@mui/lab';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import cityData from '../../assets/ir.json';

interface City {
  city: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  admin_name: string;
  capital: string;
  population: string;
  population_proper: string;
  code: string;
}

interface WeatherData {
  temp: number;
  weathercode: number;
}

const Weather: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleSearchClick = async () => {
    if (selectedCity) {
      try {
        const { lat, lng } = selectedCity;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
        const response = await axios.get(url);
        const { temp, weathercode } = response.data.current_weather;
        setWeatherData({ temp, weathercode });
      } catch (error) {
        console.error(error);
        setWeatherData(null);
      }
    }
  };

  const handleCityInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredCities = cityData
      .filter(city => city.city.toLowerCase().startsWith(value.toLowerCase()))
      .map(city => ({ ...city, code: city.iso2.toLowerCase() + '.' + city.city.toLowerCase() }));
    setCities(filteredCities);
  };

  const getWeatherCondition = (weathercode: number) => {
    switch (weathercode) {
      case 0:
        return 'Clear sky';
      case 1:
      case 2:
      case 3:
        return 'Mainly clear, partly cloudy, and overcast';
      case 45:
      case 48:
        return 'Fog and depositing rime fog';
      case 51:
      case 53:
      case 55:
        return 'Drizzle: Light, moderate, and dense intensity';
      case 56:
      case 57:
        return 'Freezing Drizzle: Light and dense intensity';
      case 61:
      case 63:
      case 65:
        return 'Rain: Slight, moderate and heavy intensity';
      case 66:
      case 67:
        return 'Freezing Rain: Light and heavy intensity';
      case 71:
      case 73:
      case 75:
        return 'Snow fall: Slight, moderate, and heavy intensity';
      case 77:
        return 'Snow grains';
      case 80:
      case 81:
      case 82:
        return 'Rain showers: Slight, moderate, and violent';
      case 85:
      case 86:
        return 'Snow showers slight and heavy';
      case 95:
        return 'Thunderstorm: Slight or moderate';
      case 96:
      case 99:
        return 'Thunderstorm with slight and heavy hail';
      default:
        return 'Unknown';
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 8, border:"1px solid red", width:"100%" }}>
      <Container maxWidth="sm">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Autocomplete
              options={cities}
              getOptionLabel={(city) => city.city}
              fullWidth
              renderInput={(params) => <TextField {...params} label="City" variant="outlined" onChange={handleCityInputChange} />}
              onChange={(event, value) => setSelectedCity(value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSearchClick}>
              Search
            </Button>
          </Grid>
          </Grid>
          {weatherData && selectedCity && (
            <>
              <Grid item xs={12}>
                <Typography variant="h4" align="center">
                  {selectedCity.city}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  {weatherData.temp}°C
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" align="center">
                  {getWeatherCondition(weatherData.weathercode)}
                </Typography>
              </Grid>
            </>
          )}
             </Container>
    </Box>
  );
};

export default Weather;