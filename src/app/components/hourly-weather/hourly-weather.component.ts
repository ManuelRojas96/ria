import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HourlyData } from '../../models/hourly-data';
import { CommonModule } from '@angular/common';
import { getFormattedTime } from '../../utils';
import { City } from '../../models/city';
import { WeatherRequesterService } from '../../services/weather-requester.service';
import { Subject, takeUntil } from 'rxjs';
import { HOURLY_DATA } from '../../default/dummy-hourly-data';

@Component({
  selector: 'app-hourly-weather',
  imports: [MatIconModule, CommonModule],
  templateUrl: './hourly-weather.component.html',
  styleUrl: './hourly-weather.component.scss',
})
export class HourlyWeatherComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  @Input() city!: City;

  data: HourlyData[] = [];
  showErrorMessage = false;

  constructor(private _weatherRequesterService: WeatherRequesterService) {}

  ngOnInit(): void {
    this._weatherRequesterService
      .getHourlyWeatherData(this.city.lat, this.city.lon, 10)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response) => {
          this.showErrorMessage = false;
          this.data = response;
        },
        error: (e) => {
          this.showErrorMessage = true;
        },
      });
  }

  private getDummyData(): void {
    this.data = HOURLY_DATA;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getFormattedTime(timestamp: number): string {
    return getFormattedTime(timestamp);
  }

  getIcon(iconId: string): string {
    return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  }
}
