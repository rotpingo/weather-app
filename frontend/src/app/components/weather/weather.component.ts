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
    this.onGetWeather("Berlin");
  }

  onGetWeather(city: String) {
    this.weatherService.getWeather(city).subscribe({
      next: (value: WeatherModel) => {
        this.cityWeather.name = value.name;
        this.cityWeather.temperature = value.temperature;
        this.cityWeather.description = value.description;
        this.cityWeather.humidity = value.humidity;
        this.cityWeather.wind = value.wind;
        this.cityWeather.cloudiness = value.cloudiness;

        console.log(value);
        console.log(this.cityWeather);
      },
      error: (error: HttpErrorResponse) => alert(error.message),
    });
  }
}
