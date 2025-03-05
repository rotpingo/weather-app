import { Request, Response } from "express";
import { WeatherService } from "../services/WeatherService";

export class WeatherController {

  constructor(private weatherService: WeatherService) {

    this.getWeather = this.getWeather.bind(this);
  }

  // get Weather Data from API and save to DB
  async getWeather(request: Request, response: Response): Promise<void> {
    try {
      const city = request.query.city as string;

      if (!city) {
        response.status(400).json({ error: "City parameter is required" });
        return
      }

      const weatherData = await this.weatherService.fetchWeather(city);
      response.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data', error);
      response.status(500).json({ error: "Failed to fetch weather data" });
    }
  };
}
