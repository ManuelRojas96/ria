import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MeasurementUnit } from '../models/measurement-unit';
import { environment } from '../../environments/environment';
import { HourlyData } from '../models/hourly-data';

@Injectable({
  providedIn: 'root',
})
export class WeatherRequesterService {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5';
  private apiId: string = environment.openWeatherApiKEY;

  constructor(private _http: HttpClient) {}

  getWeatherData(
    latitude: number,
    longitude: number,
    units: MeasurementUnit = 'metric',
    lang: string = 'es'
  ): Observable<any> {
    const endpoint = '/weather';

    const params = new HttpParams()
      .set('lat', latitude.toString())
      .set('lon', longitude.toString())
      .set('appid', this.apiId)
      .set('units', units)
      .set('lang', lang);

    return this._http.get(`${this.baseUrl}${endpoint}`, { params }).pipe(
      map((response: any) => {
        return {
          temperature: response.main.temp,
          weather: response.weather[0].description,
          windSpeed: response.wind.speed,
        };
      })
    );
  }

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
      .set('appid', this.apiId)
      .set('units', units)
      .set('lang', lang)
      .set('cnt', amount);

    return this._http.get(`${this.baseUrl}${endpoint}`, { params }).pipe(
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
  ): Observable<HourlyData[]> {
    const endpoint = '/forecast';

    const params = new HttpParams()
      .set('lat', latitude.toString())
      .set('lon', longitude.toString())
      .set('appid', this.apiId)
      .set('units', units)
      .set('lang', lang)
      .set('cnt', amount);

    return this._http.get(`${this.baseUrl}${endpoint}`, { params }).pipe(
      map((response: any) => {
        const hourlyRawValues = response['list'];
        const daily = hourlyRawValues.map((value: any) => {
          return {};
        });
        return daily;
      })
    );
  }
}
