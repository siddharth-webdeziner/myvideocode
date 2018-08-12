import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { VideodataService } from '../services/videodata.service';


@Component({
  selector: 'app-savedvideo',
  templateUrl: './savedvideo.component.html',
  styleUrls: ['./savedvideo.component.scss'],
  providers : [VideodataService]
})
export class SavedvideoComponent implements OnInit {
  urlArr:any = [];
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient, 
    public videodataService: VideodataService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.gettingVideoData();
  }

  gettingVideoData(){
    this.videodataService.getSavedVideoData().subscribe(data => {
      this.urlArr = data.videolist;
      console.log("this.urlArr : ", this.urlArr);
    })
  }

  videoURL(item){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+item);
  }

  thunbnailURL(item){
    return 'https://img.youtube.com/vi/'+item+'/0.jpg';
  }

  openVideo(item){
    this.router.navigate(['/displayvideo', { embedcode: item.videocode, category: item.videoCat, title: item.videotitle}]);
  }

}
