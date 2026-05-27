import express from 'express';
import path from 'path';
import axios from 'axios';

const app = express();

app.get('/search', async (req, res) => {
  const param = req.query.q;
  try {
    const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(param)}&count=3`);
    // console.log(response.data.results);
    res.send(response.data.results);
  } catch (error) {
    console.error(error);
  }
})

app.get('/submit', async (req, res) => {
  const param = req.query.q;
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/search?name=${encodeURIComponent(param)}`);
    console.log(response.data.results);
  } catch (error) {
    console.error(error);
  }
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})