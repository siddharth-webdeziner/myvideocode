import { Component, OnInit, Input } from '@angular/core';
import { VideodataService } from '../../services/videodata.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  providers : [VideodataService]
})
export class VideoListComponent implements OnInit {
  @Input() category: string;
  @Input() searchedText: string;
  @Input() viewList: string;
  message;
  urlArr:any = [];
  savedVideos:any = [];
  auth;
  admin;
  textSearching;
  afterloadshow;
  constructor(
    public videodataService: VideodataService,
    private router: Router,
  ) { 
    
  }

  ngOnInit() {
    this.auth = JSON.parse(localStorage.getItem('userObj'));
    if(this.auth){
      if(this.auth.username == 'siddharth'){
        this.admin = true;
      }
    }
    this.afterloadshow = false;
    this.gettingVideoData();
    console.log("category", this.category);
  }

  gettingVideoData(){
    this.videodataService.getVideoData().subscribe(data => {
      this.urlArr = data.videolist;
      this.afterloadshow = true;
      this.latestSilderVideos();
    })
  }

  latestSilderVideos(){
    for(let i=0;i< this.urlArr.length;i++){
      if(this.urlArr[i].cat == "Latest videos"){
        //this.latestVideos.push(this.urlArr[i]);
      }
    }    
  }

  openVideo(item){
    //this.router.navigate(['displayvideo', { itemData: item._id}]);
    this.router.navigateByUrl(`displayvideo/${item.videocode}`);
  }

  thunbnailURL(item){
    return 'https://img.youtube.com/vi/'+item+'/0.jpg';
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
    var downloadedUrl = "https://www.ssyoutube.com/watch?v="+videocode;
    window.open(downloadedUrl,"Ratting","width=650,height=300,left=150,top=200,toolbar=0,status=0,");
    setTimeout(function(){
      window.addEventListener('message', function(e) {
        ProcessParentMessage_2(e.data); // e.data hold the message
      } , false);
      
      function ProcessParentMessage_2(message) {
        // do something with the message
        console.log(message)
      }
    },5000)
  }
  
  viewAll(cat){
    this.router.navigate(['explorelist', { category: cat}]);
  }
}
