import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PopulatenewsService {
  url;
  currentNews;
  constructor(private http : Http) {
    this.url  = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=7245bbaa73a246deaebb09ecd5f2eeee';
  }

  getNewsData(){
    //return this.http.get(this.url+"videolist", this.config).map(res => {
    return this.http.get(this.url).map(res => {
      this.currentNews = res.json();
      return res.json()
    })
  }

}
