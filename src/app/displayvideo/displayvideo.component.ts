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
    this.paramsSubscription = this.route.params
      .subscribe((params) => {
        this.itemId = params['itemData'];
      })
      this.loadContent(this.itemId);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  loadContent(id) {
    this.videodataService.getVideoData().subscribe(data => {
      console.log('>>>>>>>>>>>>>>>>>>>> ',data.videolist);
      for(let i = 0; i < data.videolist.length; i++) {
        console.log(data.videolist[i]._id == id);
        if(data.videolist[i]._id == id) {
          console.log(">>>>>>>>>>>>>>>.. ", data.videolist[i]._id == id);
          this.category = data.videolist[i].videocat;
          this.title = data.videolist[i].videotitle;
          this.playbackurl = data.videolist[i].videocode;
          const iframe = this.hostElement.nativeElement.querySelector('iframe');
          iframe.src = "https://www.youtube.com/embed/"+this.playbackurl+"?rel=0&showinfo=0&autoplay=1";
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
    console.log("categorycategory : ", category);
    this.videodataService.getVideoData().subscribe(data => {
      console.log("data.videolist.lengthdata.videolist.length", data.videolist.length)
      this.catArr = data.videolist;
      //this.category = category;
    }); 
  }
  openVideo(item){
    this.router.navigate(['/displayvideo', { embedcode: item.videocode, category: item.videoCat, title: item.videotitle}]);
  }
  
}