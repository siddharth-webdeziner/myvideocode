import { Component, OnInit } from '@angular/core';
import { PopulatenewsService } from '../services/populatenews.service';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.scss'],
  providers : [PopulatenewsService]
})
export class NewslistComponent implements OnInit {
  newdata : any;
  loadingPage : any;
  searchNews: any;
  constructor(
    private populatenewsService: PopulatenewsService
  ) { }

  ngOnInit() {
    this.loadingPage = true;
    this.searchNews = 'everything'
    this.newsLoaded();
  }

  newsLoaded(){
    this.populatenewsService.getNewsData(this.searchNews).subscribe(data => {
      console.log("data : " ,data.articles)
      this.newdata = data.articles;
      setTimeout(_=>{this.loadingPage = false},1000);
    })
  }

  getNews(){
    console.log("searchText", this.searchNews)
    this.populatenewsService.getNewsData(this.searchNews).subscribe(data => {
      console.log("data : " ,data.articles)
      this.newdata = data.articles;
      setTimeout(_=>{this.loadingPage = false},1000);
    })
  }

}
