import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherViewComponent } from './components/weather-view/weather-view.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ria-test-app';
}
