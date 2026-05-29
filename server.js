import express from 'express';
import path from 'path';
import axios from 'axios';
import cors from 'cors';

const app = express();
// origin wildcard isn't secure!!
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
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(long)}&hourly=temperature_2m&temperature_unit=fahrenheit`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})