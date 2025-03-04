import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export async function fetchWeather(city: string) {
  const apiKey = process.env.API_KEY as string;
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const requestCity = apiUrl + city + "&appid=" + apiKey + "&units=metric";
  const response = await axios.get(requestCity);
  return response.data;
}
