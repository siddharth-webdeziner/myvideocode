import { Component, OnInit, ElementRef } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { VideodataService } from '../services/videodata.service';

@Component({
  selector: 'app-displayvideo',
  templateUrl: './displayvideo.component.html',
  styleUrls: ['./displayvideo.component.scss'],
  providers : [VideodataService]
})
export class DisplayvideoComponent implements OnInit {
  catArr:any = [];
  characters:any = [];
  videoUrl:any;
  paramsSubscription: any;
  itemId:any;
  category: any;
  title:any;
  playbackurl:any;
  videoId;
  timer: string = "0.0";
  loader;
  duration: string = "0.0";
  id;
  playerVars = {
    cc_lang_pref: 'en'
  };
  private player;
  private ytEvent;
  enable;
  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient, 
    public videodataService: VideodataService,
    private spinnerService: Ng4LoadingSpinnerService,
    private hostElement: ElementRef,
  ) {
    //this.spinnerService.show();
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.videoId = params['id'];
      this.id = 'qDuKsiwS5xw';
    });
    this.loadContent(this.itemId);
    this.loadRelatedVideos('popular');
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  loadContent(id) {
    console.log("new video");
    this.videodataService.getVideoData().subscribe(data => {
      for(let i = 0; i < data.videolist.length; i++) {
        if(data.videolist[i]._id == id) {
          this.category = data.videolist[i].videocat;
          this.title = data.videolist[i].videotitle;
          this.playbackurl = data.videolist[i].videocode;
          // const iframe = this.hostElement.nativeElement.querySelector('iframe');
          // iframe.src = "https://www.youtube.com/embed/"+this.playbackurl+"?autoplay=1";
          // iframe.allow = "autoplay";
          break;
        }
      }
    })
  }

  thunbnailURL(item){
    return 'https://img.youtube.com/vi/'+item+'/0.jpg';
  }

  videoURL(item){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+item+'?rel=0&showinfo=0&autoplay=1');
  }

  loadRelatedVideos(category){
    this.videodataService.getVideoData().subscribe(data => {
      this.catArr = data.videolist;
      console.log("this.catArr", this.catArr);
      this.category = category;
    }); 
  }
  openVideo(item){
    //this.router.navigate(['/displayvideo', { embedcode: item.videocode, category: item.videoCat, title: item.videotitle}]);
    this.router.navigateByUrl(`displayvideo/${item.videocode}`);
    this.closemodal();
    window.location.reload();
  }

  /* player controls */
  onStateChange(event) {
    this.ytEvent = event.data;
    const int = setInterval(() => {
      this.timeUpdated();
      if ( this.timer == this.duration ){
        //this.videoId = "qDuKsiwS5xw";
        //this.loadContent('qDuKsiwS5xw');
        this.videoEnded();
        clearInterval(int);
      }
    },1000);
  }
  savePlayer(player) {
    this.player = player;
  }
  
  playVideo() {
    this.player.playVideo();
  }
  
  pauseVideo() {
    this.player.pauseVideo();
  }

  timeUpdated(){
    this.timer = this.formatTime(this.player.getCurrentTime());
    this.duration = this.formatTime( this.player.getDuration());
    this.updateProgressBar();
  }

  formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    const second = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ":" + second;
  }

  private updateProgressBar(){
    // Update the value of our progress bar accordingly.
    this.loader = ((this.player.getCurrentTime() / this.player.getDuration()));
  }

  private videoEnded(){
    this.enable = true;
    
  }

  closemodal(){
    console.log("Closing the modal!!");
    setTimeout(_=>this.enable = false);
    
  }

  /* player controls */
  
}
