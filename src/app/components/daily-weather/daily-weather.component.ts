import { Component, Input, OnInit } from '@angular/core';
import { DailyData } from '../../models/daily-data';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { City } from '../../models/city';
import { WeatherRequesterService } from '../../services/weather-requester.service';
import { Subject, takeUntil } from 'rxjs';
import { DAILY_FORECAST } from '../../default/dummy-daily-data';

@Component({
  selector: 'app-daily-weather',
  imports: [CommonModule, MatIconModule],
  templateUrl: './daily-weather.component.html',
  styleUrl: './daily-weather.component.scss',
})
export class DailyWeatherComponent implements OnInit {
  private destroy = new Subject<void>();

  @Input() city!: City;

  data: DailyData[] = [];
  showErrorMessage = true;

  constructor(private _weatherRequesterService: WeatherRequesterService) {}

  ngOnInit(): void {
    /* this._weatherRequesterService
      .getDailyWeatherData(this.city.lat, this.city.lon, 10)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response) => {
          this.showErrorMessage = false;
          this.data = response;
        },
        error: (e) => {
          this.showErrorMessage = true;
        },
      }); */
    this.getDummyData();
  }

  getDummyData() {
    this.data = DAILY_FORECAST;
  }

  getIcon(iconId: string): string {
    return `https://cdn.weatherbit.io/static/img/icons/${iconId}.png`;
  }
}
