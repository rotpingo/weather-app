import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WeatherModel } from '../../models/weather.model';
import { SavedCitiesModel } from '../../models/saved.model';

@Component({
  selector: 'app-footbar',
  imports: [ReactiveFormsModule],
  templateUrl: './footbar.component.html',
  styleUrl: './footbar.component.css'
})
export class FootbarComponent {

  @ViewChild('modal', { static: true }) modal!: ElementRef;
  @ViewChild('cover', { static: true }) cover!: ElementRef;
  @ViewChild('search', { static: true }) search!: ElementRef;
  @ViewChild('saved', { static: true }) saved!: ElementRef;

  city = new FormControl('', [Validators.required, Validators.minLength(1)]);

  cities: SavedCitiesModel[] = [];

  constructor(private service: WeatherService){}

  closeModal() {
    const coverElement = this.cover.nativeElement;
    coverElement.style.display = "none";
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = "none";
    const searchElement = this.search.nativeElement;
    searchElement.style.display = "none";
    const savedElement = this.saved.nativeElement;
    savedElement.style.display = "none";
  }

  openModal() {
    const coverElement = this.cover.nativeElement;
    coverElement.style.display = "flex";
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = "flex";
  }

  openSearch() {
    const searchElement = this.search.nativeElement;
    searchElement.style.display = "flex";
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = "none";
  }

  onSearchCity() {
    if (this.city.valid && this.city.value != '') {
      this.service.getWeatherApi(this.city.value!).subscribe({
        next: 
          (value: WeatherModel) => { 
            this.service.updateWeatherData(value),
            console.log(this.service.cityData.value)
        },
          
        error: (error: HttpErrorResponse) => alert(error.message),
      });
    }

    this.closeModal();
  }

  onGetSavedCities(){

    const savedElement = this.saved.nativeElement;
    const coverElement = this.cover.nativeElement;
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = "none";

    this.service.getSavedCities().subscribe({
      next: (value: SavedCitiesModel[]) => this.cities = value,
      error: (error: HttpErrorResponse) => alert(error.message)
    });

    console.log(this.cities);

    savedElement.style.display = "flex";
    coverElement.style.display = "flex";
  }

  onSaveCity(){
    const currentCity = this.service.cityData.value;

    const newCity: SavedCitiesModel = {
      name: currentCity.name,
      country: currentCity.country
    };

    this.service.saveCity(newCity).subscribe({
      next: () => {
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => alert(error.message)
    })
    
  }

}
