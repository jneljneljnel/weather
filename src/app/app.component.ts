import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  data: any = {};
  city:string = '';
  lat: number = 0;
  lon: number = 0; 

  constructor(private http: Http ){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.getWeather(this.lat,this.lon);
      });
   }
   else {
     this.title = 'Please enable location services.'; 
   }
  }

  formApi(lat, lon){
    let apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon=' + lon +'&units=imperial&appid=2dfdb85c4f6856af79233fb6528a05ab';
    return apiUrl;
  }

  getData(lat, lon){
    return this.http.get(this.formApi(lat, lon))
      .map((res:Response)=>res.json())
  }

  divideArray(list, int){
    var arr = [];
    list.forEach(element => {
      console.log(element);
    });
  }

  getWeather(lat, lon) {
    this.getData(lat, lon).subscribe(data => {console.log(data); this.city = data.city.name; this.data = data})
  }
}