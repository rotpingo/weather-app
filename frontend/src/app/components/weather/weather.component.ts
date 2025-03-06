import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherModel } from '../../models/weather.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {

  cityWeather: WeatherModel = {
    name: "",
    temperature: 0,
    description: "",
    humidity: 0,
    wind: 0,
    cloudiness: 0
  }

  constructor(private weatherService: WeatherService) { }


  ngOnInit(): void {
    //this.onGetWeather("Ottawa");
    this.getDirectWeather("Berlin");
  }

  onGetWeather(city: String) {
    this.weatherService.getWeather(city).subscribe({
      next: (value: WeatherModel) => {
        this.cityWeather.name = value.name;
        this.cityWeather.temperature = Math.floor(value.temperature);
        this.cityWeather.description = value.description;
        this.cityWeather.humidity = value.humidity;
        this.cityWeather.wind = Math.floor(value.wind);
        this.cityWeather.cloudiness = value.cloudiness;

        console.log(value);
        console.log(this.cityWeather);
      },
      error: (error: HttpErrorResponse) => alert(error.message),
    });
  }

  async getDirectWeather(city: String) {
    const ApiKey = "da7f408c3e49dd36e0aff646c9b441d6";
    const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    const response = await fetch(ApiUrl + city + "&appid=" + ApiKey + "&units=metric");

    let data = await response.json();
    if (data) {
      console.log(data);
      this.cityWeather.name = data.name;
      this.cityWeather.temperature = Math.floor(data.main.temp);
      this.cityWeather.description = data.weather[0].description;
      this.cityWeather.humidity = data.main.humidity;
      this.cityWeather.wind = Math.floor(data.wind.speed);
      this.cityWeather.cloudiness = data.clouds.all;
    }
  }


}
