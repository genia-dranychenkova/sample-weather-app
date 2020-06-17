import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = '6bf4cb474cf40957e307cf9501efc57f';

  constructor(private http: HttpClient) {
  }

  getWeatherDataByCoords(lat, lon) {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.apiKey);
    return this.http.get(this.url, { params });
  }
  getWeatherDataByCityName(city: string) {
    let params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', this.apiKey);
    return this.http.get(this.url, { params });
  }
}
