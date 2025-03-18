import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HourlyData } from '../../models/hourly-data';
import { CommonModule } from '@angular/common';
import { getFormattedTime } from '../../utils';
import { City } from '../../models/city';
import { WeatherRequesterService } from '../../services/weather-requester.service';
import { Subject, takeUntil } from 'rxjs';

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

  constructor(private _weatherRequesterService: WeatherRequesterService) {}

  ngOnInit(): void {
    this._weatherRequesterService
      .getHourlyWeatherData(this.city.lat, this.city.lon, 10)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response) => {
          this.data = response;
        },
      });
    //this.getDummyData();
  }

  private getDummyData(): void {
    this.data = [
      {
        timestamp: 1633024800,
        temperature: 20,
        rainChance: 0.1,
        iconId: '01d',
      },
      {
        timestamp: 1633024800,
        temperature: 20,
        rainChance: 0.1,
        iconId: '03d',
      },
      {
        timestamp: 1633024800,
        temperature: 20,
        rainChance: 0.1,
        iconId: '10d',
      },
      {
        timestamp: 1633024800,
        temperature: 20,
        rainChance: 0.1,
        iconId: '01d',
      },
      {
        timestamp: 1633024800,
        temperature: 20,
        rainChance: 0.1,
        iconId: '03d',
      },
      {
        timestamp: 1633024800,
        temperature: 20,
        rainChance: 0.1,
        iconId: '10d',
      },
    ];
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
