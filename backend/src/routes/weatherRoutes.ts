import express, { Request, Response } from "express";
import { getWeather, getWeatherHistory } from "../controllers/WeatherController";

const router = express.Router();

router.get("/", getWeather as express.RequestHandler);
router.get("/history", getWeatherHistory);

export default router;
