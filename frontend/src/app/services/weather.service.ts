import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherModel } from '../models/weather.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SavedCitiesModel } from '../models/saved.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  cityData = new BehaviorSubject<WeatherModel>({
    name: "",
    country: "",
    temperature: 0,
    description: "",
    humidity: 0,
    wind: 0,
    cloudiness: 0,
    weatherCode: 0
  });
  
  private apiServerUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    this.loadDefaultData();
   }

  getWeatherApi(city: String): Observable<WeatherModel> {
    const url = `${this.apiServerUrl}/weather?city=${city}`;
    return this.http.get<WeatherModel>(url);
  }

  updateWeatherData(data: WeatherModel){
    this.cityData.next(data);
  }

  getWeatherData(): Observable<WeatherModel>{
    return this.cityData.asObservable();
  }

  loadDefaultData(){
    this.getWeatherApi("Berlin").subscribe({
      next: (value: WeatherModel) => this.cityData.next(value),
      error: (error: HttpErrorResponse) => alert(error.message),
    });
  }

  getSavedCities(): Observable<SavedCitiesModel[]>{
    const url = `${this.apiServerUrl}/weather/saved`;
    return this.http.get<SavedCitiesModel[]>(url);
  }

  saveCity(saved: SavedCitiesModel): Observable<void>{
    const url = `${this.apiServerUrl}/weather/saved`;
    return this.http.post<void>(url, saved);
  }
}
