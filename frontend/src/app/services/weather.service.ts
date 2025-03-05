import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherModel } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiServerUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getWeather(city: String): Observable<WeatherModel> {
    const url = `${this.apiServerUrl}/weather?city=${city}`;
    return this.http.get<WeatherModel>(url);
  }
}
