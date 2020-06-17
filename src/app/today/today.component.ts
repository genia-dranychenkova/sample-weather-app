import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  lat;
  lon;
  weather;
  locationDeined = true;
  locationDeinedEnableCity = false;

  constructor(private weatherServise: WeatherService) {
  }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        this.weatherServise.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
        });
      }, (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          this.locationDeined = false;
          this.locationDeinedEnableCity = true;
          }
        });
    }
  }

  getCity(city) {
    this.weatherServise.getWeatherDataByCityName(city).subscribe((data: any) => {
      this.weather = data;
      this.lat = data.coord.lat;
      this.lon = data.coord.lon;
    });
  }
  getCoords(event) {
    this.lat = event.coords.lat;
    this.lon = event.coords.lng;
    this.weatherServise.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
      this.weather = data;
    });
  }
}
