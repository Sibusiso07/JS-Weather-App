import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q="
const API_KEY = "&appid=API Key"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    try{
        const response = await axios.get(API_URL + "Sandton" + API_KEY + "&units=metric");
        res.render("index.ejs", {
                                tempData: response.data.main.temp,
                                typeData: response.data.weather[0].main,
                                humidityData: response.data.main.humidity,
                                windSpeed: response.data.wind.speed + "m/s",});
    } catch (error) {
        console.error("failed to make request", error.message);
        res.render("index.ejs", {error: error.message});
    }
});

app.get("/result", async (req, res) => {
    const city = req.body.id;
    try{
        const response = await axios.get(API_URL + city + API_KEY + "&units=metric");
        res.render("index.ejs", {
                                tempData: response.data.main.temp,
                                typeData: response.data.weather[0].main,
                                humidityData: response.data.main.humidity,
                                windSpeed: response.data.wind.speed + "m/s",
                                location: city,});
    } catch (error) {
        console.error("failed to make request", error.message);
        res.render("index.ejs", {error: error.message});
    }
});


app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});
