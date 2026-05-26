import express from 'express';
import path from 'path';
import axios from 'axios';

const app = express();

app.get('/search', async (req, res) => {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m');
    res.json(response);
  } catch (error) {
    console.error(error);
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})