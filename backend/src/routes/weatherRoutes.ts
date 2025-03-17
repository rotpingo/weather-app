import express from "express";
import { WeatherController } from "../controllers/WeatherController";
import { WeatherService } from "../services/WeatherService";

const router = express.Router();
const weatherService = new WeatherService();
const weatherController = new WeatherController(weatherService);

router.get("/weather", weatherController.getWeather);
router.post("/weather/saved", weatherController.saveCity);

export default router;
