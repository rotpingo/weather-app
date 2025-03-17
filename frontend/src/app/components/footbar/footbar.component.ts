import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WeatherModel } from '../../models/weather.model';

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

  cities: string[] = [];

  constructor(private service: WeatherService){}

  closeModal() {
    const coverElement = this.cover.nativeElement;
    coverElement.style.display = "none";
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = "none";
    const searchElement = this.search.nativeElement;
    searchElement.style.display = "none";
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
        next: (value: WeatherModel) => this.service.updateWeatherData(value),
        error: (error: HttpErrorResponse) => alert(error.message),
      });
    }

    this.closeModal();

  }

}
