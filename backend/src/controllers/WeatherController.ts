import { Request, RequestHandler, Response } from "express";
import Weather from "../model/Weather";
import { WeatherService } from "../services/WeatherService";

export class WeatherController {

  private weatherService = new WeatherService();

  // get Weather Data from API and save to DB
  async getWeather(request: Request, response: Response): Promise<void> {
    try {
      const city = request.query.city as string;
      const weatherData = await this.weatherService.fetchWeather(city);
      response.json(weatherData);
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch weather data" });
    }
  };
}
