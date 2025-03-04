import { Request, Response } from "express";
import Weather from "../model/Weather";
import { fetchWeather } from "../services/WeatherService";

// get Weather Data from API and save to DB
export async function getWeather(request: Request, response: Response) {
  try {
    const city = request.query.city as string;
    if (!city) {
      return response.status(400).json({ error: "City is required" });
    }

    const weatherData = await fetchWeather(city);

    const newWeather = new Weather({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      wind: weatherData.wind.speed,
      cloudiness: weatherData.clouds.all
    });

    await newWeather.save();

    response.json(weatherData);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch weather data" });
  }
};

export async function getWeatherHistory(response: Response, request: Request) {
  try {
    const weatherHistory = await Weather.find();
    response.json(weatherHistory);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch weather history" });
  }
};
