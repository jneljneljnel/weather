import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import * as moment from 'moment';


@Component({
  selector: 'body',
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
      navigator.geolocation.getCurrentPosition(pos => {  
        this.getWeather(pos.coords.latitude,pos.coords.longitude);  
      },(error =>{
        this.getWeather(33.71,-117.76);
      }));     
  }

  getWeather(lat, lon) {
    this.getData(lat, lon).subscribe(data => {
      this.setBgImg(data.city.name);
      this.divideArray(data);
      this.formatDate(data);
      this.formatIcon(data);
      this.city = data.city.name;
      this.data = data      
    });
  }

  getData(lat, lon){
    // return this.http.get("http://35.193.165.66:8080")
    //   .map((res:Response)=>res.json());
    return this.http.get(this.formApi(lat, lon))
      .map((res:Response)=>res.json())
  }

  formApi(lat, lon){
    let apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon=' + lon +'&units=imperial&appid=2dfdb85c4f6856af79233fb6528a05ab';
    return apiUrl;
  }

  setBgImg(city){
    let body = document.getElementsByTagName('body')[0];
    if(city === "Orange County"){
          body.classList.add('irvine');
    }
    else if(city === "Los Angeles"){
          body.classList.add('la');
    }
    else if(moment().isAfter(moment('07:00', 'hh:mm'))){
          body.classList.add('night');
    } 
    else {
      body.classList.add('day');
    }
  };

  formatDate(data){
      data.list.forEach( l => {
         l.dt_txt =(moment(l.dt_txt).format('MMM Do h:mm a'));      
      }) 
      return data
  }



  formatIcon(data){
    data.list.forEach( el =>{
      el.weather.forEach(l =>{
        if (l.description == 'Clear Sky'){
          l.icon = 'wi-day-sunny'
        }
      });
    })
  }

  getIcon(desc){
    let icon
    if(desc == 'clear sky'){
      icon =  {'wi-day-sunny':true}
    }
    if(desc == 'few clouds'){
      icon =  {'wi-cloud':true}
    }
    if(desc == 'scattered clouds'){
      icon =  {'wi-cloudy':true}
    }
    if(desc == 'broken clouds'){
      icon =  {'wi-cloudy':true}
    }
    if(desc == 'shower rain'){
      icon =  {'wi-rain-wind':true}
    }
    if(desc == 'rain'){
      icon =  {'wi-rain':true}
    }
    if(desc == 'thunderstorm'){
      icon =  {'wi-thunderstorm':true}
    }
    if(desc == 'snow'){
      icon =  {'wi-snow':true}
    }
    if(desc == 'mist'){
      icon =  {'wi-rain-mix':true}
    }
    return icon
  }

  divideArray(data){
    var arr = [];
    data.list.forEach( el => {
     if(data.list.indexOf(el) % 8 == 0 || data.list.indexOf(el) == 0 ){
       arr.push(el);
     };
    });
    data.list = arr;
    return data;
  }

  
}