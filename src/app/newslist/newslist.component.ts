import { Component, OnInit } from '@angular/core';
import { PopulatenewsService } from '../services/populatenews.service';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.scss'],
  providers : [PopulatenewsService]
})
export class NewslistComponent implements OnInit {
  newdata;
  constructor(
    private populatenewsService: PopulatenewsService
  ) { }

  ngOnInit() {
    this.newsLoaded();
  }

  newsLoaded(){
    this.populatenewsService.getNewsData().subscribe(data => {
      console.log("data : " ,data.articles)
      this.newdata = data.articles;
    })
  }

  newsDesc(i){
    
  }

}
