import { Request, Response } from "express";
import { WeatherService } from "../services/WeatherService";
import Weather from "../model/Weather";
import FavCity from "../model/FavCity";

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

      const newWeather = new Weather({
        name: weatherData.name,
        country: weatherData.sys.country,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        wind: weatherData.wind.speed,
        cloudiness: weatherData.clouds.all,
        weatherCode: weatherData.weather[0].id
      })

      // await newWeather.save();


      response.json(newWeather);
    } catch (error) {
      console.error('Error fetching weather data', error);
      response.status(500).json({ error: "Failed to fetch weather data" });
    }
  };

  async saveCity(request: Request, response: Response): Promise<void> {
    try {
      const city = request.query.city as string;

      if (!city) {
        response.status(400).json({ error: "City parameter is required" });
        return
      }

      const newCity = new FavCity({
        name: city
      });

      await newCity.save();
      response.json(newCity);

    } catch (error) {
      console.error('Error saving city', error);
      response.status(500).json({ error: "Failed to save city" });
    }
  }




}


