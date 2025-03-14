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

  imgUrl = "";

  cityWeather: WeatherModel = {
    name: "",
    country: "",
    temperature: 0,
    description: "",
    humidity: 0,
    wind: 0,
    cloudiness: 0,
    weatherCode: 0
  }

  constructor(private weatherService: WeatherService) { }


  ngOnInit(): void {
    this.loadData();
    //this.onGetWeather("Berlin");
    //this.getDirectWeather("Lisabon");

  }

  loadData() {
    this.weatherService.getWeatherData().subscribe({
      next: (value: WeatherModel) => {
        this.cityWeather.name = value.name,
          this.cityWeather.country = value.country,
          this.cityWeather.temperature = Math.floor(value.temperature);
        this.cityWeather.description = value.description;
        this.cityWeather.humidity = value.humidity;
        this.cityWeather.wind = value.wind;
        this.cityWeather.cloudiness = value.cloudiness;
        this.cityWeather.weatherCode = value.weatherCode;

        this.getImg(this.cityWeather.weatherCode);
      },
      error: (error: HttpErrorResponse) => alert(error.message),
    });
  }

  getImg(weatherCode: number) {

    switch (true) {
      case weatherCode >= 200 && weatherCode <= 232:
        return this.imgUrl = "weather-status-img/cloud-thunder-rain.png";
      case weatherCode >= 300 && weatherCode <= 321:
        return this.imgUrl = "weather-status-img/cloud-rain.png";
      case weatherCode >= 500 && weatherCode <= 531:
        return this.imgUrl = "weather-status-img/cloud-heavy-rain.png";
      case weatherCode >= 600 && weatherCode <= 601:
        return this.imgUrl = "weather-status-img/cloud-snow.png";
      case weatherCode == 602 || weatherCode == 620 || weatherCode == 621 || weatherCode == 622:
        return this.imgUrl = "weather-status-img/cloud-heavy-snow.png";
      case weatherCode >= 611 && weatherCode < 620:
        return this.imgUrl = "weather-status-img/cloud-snow-rain.png";
      case weatherCode >= 701 && weatherCode <= 781:
        return this.imgUrl = "weather-status-img/clouds.png";
      case weatherCode == 800:
        return this.imgUrl = "weather-status-img/sun.png";
      case weatherCode == 801:
        return this.imgUrl = "weather-status-img/cloud-sun.png";
      case weatherCode >= 802 && weatherCode <= 804:
        return this.imgUrl = "weather-status-img/clouds.png";
      default:
        return console.log("wrong weather status");
    }
  }

}
