import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { FootbarComponent } from './components/footbar/footbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherComponent, FootbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather';
}
