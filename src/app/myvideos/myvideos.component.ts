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
    this.displayPopup = false;
    this.auth = JSON.parse(localStorage.getItem('userObj'));
    if(this.auth){
      if(this.auth.username == 'siddharth'){
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
    this.router.navigate(['displayvideo', { itemData: item._id}]);
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

  downloadVideo(videocode){
    console.log(videocode);
    var downloadedUrl = "https://www.ssyoutube.com/watch?v="+videocode;
    window.open(downloadedUrl,"Ratting","width=650,height=300,left=150,top=200,toolbar=0,status=0,");
    setTimeout(function(){
      console.log("clicking !!");
      window.addEventListener('message', function(e) {
        ProcessParentMessage_2(e.data); // e.data hold the message
      } , false);
      
      function ProcessParentMessage_2(message) {
        // do something with the message
        console.log(message)
      }
    },5000)
  }

  getTotalAmt(){
    this.textSearched = this.searchText;
  }
}