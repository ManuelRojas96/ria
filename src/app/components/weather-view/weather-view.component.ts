import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WeatherRequesterService } from '../../services/weather-requester.service';
import { HourlyWeatherComponent } from '../hourly-weather/hourly-weather.component';
import { DEFAULT_CITIES } from '../../default/cities';
import { DailyWeatherComponent } from '../daily-weather/daily-weather.component';
import { City } from '../../models/city';
import { Observable } from 'rxjs';
import { HourlyData } from '../../models/hourly-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-view',
  imports: [
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    CommonModule,
    HourlyWeatherComponent,
    DailyWeatherComponent,
  ],
  templateUrl: './weather-view.component.html',
  styleUrl: './weather-view.component.scss',
})
export class WeatherViewComponent implements OnInit {
  defaultCities = DEFAULT_CITIES;
  lastUpdateTime: string = '';

  constructor(
    private weatherRequesterService: WeatherRequesterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lastUpdateTime = this.getCurrentDate();
  }

  getHourlyWeather(city: City): Observable<HourlyData[]> {
    this.lastUpdateTime = this.getCurrentDate();
    return this.weatherRequesterService.getHourlyWeatherData(
      city.lat,
      city.lon
    );
  }

  private getCurrentDate(): string {
    const nowDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return nowDate.toLocaleString('en-US', options).replace(',', '');
  }

  onSearch(): void {
    this.router.navigate(['/search']);
  }

  onRefresh(): void {
    window.location.reload();
  }
}
