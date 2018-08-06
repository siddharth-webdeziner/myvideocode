import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { VideodataService } from '../services/videodata.service';

@Component({
  selector: 'app-myvideos',
  templateUrl: './myvideos.component.html',
  styleUrls: ['./myvideos.component.scss'],
  providers : [VideodataService]
})
export class MyvideosComponent implements OnInit {
  urlArr:any = [];
  characters:any = [];
  videoUrl:any;
  latestVideos:any = [];
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient, 
    public videodataService: VideodataService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    //this.spinnerService.show();
  }

  ngOnInit() {
    this.gettingVideoData();
  }

  gettingVideoData(){
    this.videodataService.getVideoData().subscribe(data => {
      this.urlArr = data.videolist;
      console.log("this.urlArr : ", this.urlArr);
      this.latestSilderVideos();
    })
  }

  videoURL(item){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+item);
  }

  thunbnailURL(item){
    return 'https://img.youtube.com/vi/'+item+'/0.jpg';
  }

  openVideo(item){
    console.log("item :",item)
    this.router.navigate(['/displayvideo', { embedcode: item.lastCode, category: item.cat, title: item.desc }]);
  }

  latestSilderVideos(){
    console.log("this.urlArr 123 : ", this.urlArr);
    for(let i=0;i< this.urlArr.length;i++){
      if(this.urlArr[i].cat == "Latest videos"){
        this.latestVideos.push(this.urlArr[i]);
      }
    }
    // setTimeout(()=>{    //<<<---    using ()=> syntax
    //   this.spinnerService.hide();
    // },2000);
    
  }

}