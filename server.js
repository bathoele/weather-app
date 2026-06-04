import express from 'express';
import path from 'path';
import axios from 'axios';
import cors from 'cors';

const app = express();
// origin wildcard isn't secure!! fix later
app.use(cors({
  origin: '*'
}));

app.get('/search', async (req, res) => {
  const param = req.query.q;
  try {
    const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(param)}&count=3`);
    // console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
})

app.get('/submit', async (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(long)}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,relative_humidity_2m_max&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,cloud_cover,uv_index,precipitation_probability&current=temperature_2m&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`);
    // console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})