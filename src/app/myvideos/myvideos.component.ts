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
  savedVideos:any = [];
  searchText:any;
  item:any;
  nocontent:any;
  auth:any;
  admin:any;
  activate:any;
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
    this.auth = JSON.parse(localStorage.getItem('userObj'));
    if(this.auth){
      if(this.auth.username == 'Siddharth Shahi'){
        this.admin = true;
      }
    }
    this.gettingVideoData();
    this.gettingSavedVideoData(this.auth.email);
  }

  gettingVideoData(){
    this.videodataService.getVideoData().subscribe(data => {
      this.urlArr = data.videolist;
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
    this.router.navigate(['/displayvideo', { embedcode: item.videocode, category: item.videocat, title: item.videotitle}]);
  }

  latestSilderVideos(){
    for(let i=0;i< this.urlArr.length;i++){
      if(this.urlArr[i].cat == "Latest videos"){
        this.latestVideos.push(this.urlArr[i]);
      }
    }    
  }
  deleteVideo(id){
    this.videodataService.deleteVideoData(id).subscribe(data => {
      this.gettingVideoData()
      this.latestSilderVideos();
    })
  }

  saveVideo(item, index){
    this.videodataService.saveVideoData(item,this.auth.email).subscribe(data => {
      this.gettingVideoData()
      this.latestSilderVideos();
    })
  }

  likeVideo(id){
    this.videodataService.likeVideo(id).subscribe(data => {
      this.gettingVideoData()
      this.latestSilderVideos();
    })
  }

  gettingSavedVideoData(email){
    this.videodataService.getSavedVideoData(email).subscribe(data => {
      for(var i = 0;i < data.videolist.length; i++){
        if(data.videolist[i].email == this.auth.email){
          this.savedVideos.push(data.videolist[i].videocode);
        }
      }
    })
  }

  checkSavedVideo(videocode){
    if(this.savedVideos.includes(videocode)){
      return false;
    } else {
      return true;
    }
  }

}