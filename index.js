import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const API_URL = "http://api.weatherapi.com/v1";
const API_KEY = "8ffd38753e65441394a153617251909";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/today", async (req, res) => {
  const locInput = req.body["loc"] || req.body["submit"];
  
  try {
    const forecastResult = await axios.get(API_URL + "/forecast.json?key=" + API_KEY + "&q=" + locInput + "&days=1");
    res.render("today.ejs", { data: forecastResult.data});
  } catch (error) {
    console.log(error);
  }
});

app.post("/hourly", async (req, res) => {
  const locInput = req.body["loc"] || req.body["submit"];
  const now = Math.floor(Date.now() / 1000) - 3600;

  try {
    const forecastResult = await axios.get(API_URL + "/forecast.json?key=" + API_KEY + "&q=" + locInput + "&days=3");
    console.log(forecastResult.data.forecast.forecastday[0].hour[0]);

    res.render("hourly.ejs", { data: forecastResult.data,
                               forecastday: forecastResult.data.forecast.forecastday,
                               nower: now,
    });
  } catch (error) {
    console.log(error);
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});