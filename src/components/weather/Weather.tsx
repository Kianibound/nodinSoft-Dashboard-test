import React, { useContext, useState } from "react";
import { Autocomplete } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import cityData from "../../assets/ir.json";
import { ThemeContext } from "../../utils/ThemeProvider";

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
  const { theme } = useContext(ThemeContext);

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

  const handleCityInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const filteredCities = cityData
      .filter((city) => city.city.toLowerCase().startsWith(value.toLowerCase()))
      .map((city) => ({
        ...city,
        code: city.iso2.toLowerCase() + "." + city.city.toLowerCase(),
      }));
    setCities(filteredCities);
  };

  const getWeatherCondition = (weathercode: number) => {
    switch (weathercode) {
      case 0:
        return "Clear sky";
      case 1:
      case 2:
      case 3:
        return "Mainly clear, partly cloudy, and overcast";
      case 45:
      case 48:
        return "Fog and depositing rime fog";
      case 51:
      case 53:
      case 55:
        return "Drizzle: Light, moderate, and dense intensity";
      case 56:
      case 57:
        return "Freezing Drizzle: Light and dense intensity";
      case 61:
      case 63:
      case 65:
        return "Rain: Slight, moderate and heavy intensity";
      case 66:
      case 67:
        return "Freezing Rain: Light and heavy intensity";
      case 71:
      case 73:
      case 75:
        return "Snow fall: Slight, moderate, and heavy intensity";
      case 77:
        return "Snow grains";
      case 80:
      case 81:
      case 82:
        return "Rain showers: Slight, moderate, and violent";
      case 85:
      case 86:
        return "Snow showers slight and heavy";
      case 95:
        return "Thunderstorm: Slight or moderate";
      case 96:
      case 99:
        return "Thunderstorm with slight and heavy hail";
      default:
        return "Unknown";
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        width: "100%",
        backgroundColor: theme === "light" ? "white" : "#292828",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: theme === "light" ? "white" : "#292828",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: theme === "light" ? "white" : "#292828",
            color: theme === "light" ? "black" : "white",
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              backgroundColor: theme === "light" ? "white" : "#292828",
              color: theme === "light" ? "black" : "white",
            }}
          >
            <Autocomplete
              options={cities}
              getOptionLabel={(city) => city.city}
              fullWidth
              sx={{
                backgroundColor: theme === "light" ? "white" : "#292828",
                color: theme === "light" ? "black" : "white",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  variant="outlined"
                  onChange={handleCityInputChange}
                />
              )}
              onChange={(event, value) => setSelectedCity(value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              backgroundColor: theme === "light" ? "white" : "#292828",
              color: theme === "light" ? "black" : "white",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearchClick}
              sx={{
                backgroundColor: theme === "light" ? "white" : "#010724",
                color: theme === "light" ? "black" : "white",
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {weatherData && selectedCity && (
          <>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: theme === "light" ? "white" : "#292828",
                color: theme === "light" ? "black" : "white",
              }}
            >
              <Typography
                variant="h4"
                align="center"
                sx={{
                  backgroundColor: theme === "light" ? "white" : "#292828",
                  color: theme === "light" ? "black" : "white",
                }}
              >
                {selectedCity.city}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  backgroundColor: theme === "light" ? "white" : "#292828",
                  color: theme === "light" ? "black" : "white",
                }}
              >
                {weatherData.temp}°C
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: theme === "light" ? "white" : "#292828",
                color: theme === "light" ? "black" : "white",
              }}
            >
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  backgroundColor: theme === "light" ? "white" : "#292828",
                  color: theme === "light" ? "black" : "white",
                }}
              >
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
