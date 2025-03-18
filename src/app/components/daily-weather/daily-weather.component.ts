import { Component, Input } from '@angular/core';
import { DailyData } from '../../models/daily-data';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { City } from '../../models/city';
import { WeatherRequesterService } from '../../services/weather-requester.service';

@Component({
  selector: 'app-daily-weather',
  imports: [CommonModule, MatIconModule],
  templateUrl: './daily-weather.component.html',
  styleUrl: './daily-weather.component.scss',
})
export class DailyWeatherComponent {
  @Input() city!: City;

  data: DailyData[] = [];

  constructor(private _weatherRequesterService: WeatherRequesterService) {}
}
