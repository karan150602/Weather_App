const express = require("express");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ message: "City is Required!!" });
  }
  let weather, error = null;
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;
    const response = await axios.get(apiUrl);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error, Please try again";
  }

  res.render("index", { weather, error });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
