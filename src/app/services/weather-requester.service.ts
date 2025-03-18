import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, min, Observable } from 'rxjs';
import { MeasurementUnit } from '../models/measurement-unit';
import { environment } from '../../environments/environment';
import { HourlyData } from '../models/hourly-data';
import { DailyData } from '../models/daily-data';

@Injectable({
  providedIn: 'root',
})
export class WeatherRequesterService {
  private openWeatherBaseUrl: string =
    'https://api.openweathermap.org/data/2.5';
  private openWeatherApiId: string = environment.openWeatherApiKEY;

  private weatherBitBaseUrl: string = 'https://api.weatherbit.io/v2.0';
  private weatherBitApiId: string = environment.weatherBitApiKey;

  constructor(private _http: HttpClient) {}

  getHourlyWeatherData(
    latitude: number,
    longitude: number,
    amount: number = 5,
    units: MeasurementUnit = 'metric',
    lang: string = 'es'
  ): Observable<HourlyData[]> {
    const endpoint = '/forecast';

    const params = new HttpParams()
      .set('lat', latitude.toString())
      .set('lon', longitude.toString())
      .set('appid', this.openWeatherApiId)
      .set('units', units)
      .set('lang', lang)
      .set('cnt', amount);

    return this._http
      .get(`${this.openWeatherBaseUrl}${endpoint}`, { params })
      .pipe(
        map((response: any) => {
          const hourlyRawValues = response['list'];
          const hourlyValues = hourlyRawValues.map((value: any) => {
            const timestamp = value['dt'];
            const rainChance = value['rain']?.['3h'] ?? 0.0;
            const temperature = value['main']?.['temp'];
            const iconId = value['weather']?.[0]?.['icon'];

            return { timestamp, rainChance, temperature, iconId };
          });
          return hourlyValues;
        })
      );
  }

  getDailyWeatherData(
    latitude: number,
    longitude: number,
    amount: number = 5,
    units: MeasurementUnit = 'metric',
    lang: string = 'es'
  ): Observable<DailyData[]> {
    const endpoint = '/forecast/daily';

    const params = new HttpParams()
      .set('lat', latitude.toString())
      .set('lon', longitude.toString())
      .set('key', this.weatherBitApiId);

    return this._http
      .get(`${this.weatherBitBaseUrl}${endpoint}`, { params })
      .pipe(
        map((response: any) => {
          const rawFiveDaysWeather = response.data.slice(0, 5);
          const fiveDaysWeather = rawFiveDaysWeather.map((entry: any) => {
            const date = entry['datetime'];
            const description = entry['weather']?.['description'];
            const iconId = entry['weather']?.['icon'];
            const minTemp = entry['min_temp'];
            const maxTemp = entry['max_temp'];
            return { date, description, iconId, minTemp, maxTemp };
          });
          return fiveDaysWeather;
        })
      );
  }
}
