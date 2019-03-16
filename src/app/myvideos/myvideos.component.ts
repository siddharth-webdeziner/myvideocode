import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VideodataService } from '../services/videodata.service';

@Component({
  selector: 'app-myvideos',
  templateUrl: './myvideos.component.html',
  styleUrls: ['./myvideos.component.scss'],
  providers : [VideodataService]
})
export class MyvideosComponent implements OnInit {
  parentMessage = "message from parent"
  urlArr:any = [];
  characters:any = [];
  videoUrl:any;
  latestVideos:any = [];
  savedVideos:any = [];
  searchText:any;
  item:any;
  nocontent:any;
  auth:any;
  admin:any;
  activate:any;
  displayPopup: boolean;
  slideConfig;
  textSearched;
  loadingPage;
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient, 
    public videodataService: VideodataService
  ) {
  }

  ngOnInit() {
    this.displayPopup = false;
    this.loadingPage = true;
    this.auth = JSON.parse(localStorage.getItem('userObj'));
    if(this.auth){
      if(this.auth.username == 'siddharth'){
        this.admin = true;
      }
    }
    this.gettingVideoData();
  }

  gettingVideoData(){
    this.videodataService.getVideoData().subscribe(data => {
      this.urlArr = data.videolist;
      setTimeout(_=>{this.loadingPage = false},1000);
    })
  }
  getChange(){
    this.textSearched = this.searchText;
  }
}
