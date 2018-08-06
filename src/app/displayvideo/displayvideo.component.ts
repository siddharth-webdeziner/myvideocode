import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router';
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
  playbackurl:any;
  category:any;
  title:any;
  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private http: HttpClient, 
    public videodataService: VideodataService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    //this.spinnerService.show();
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .subscribe((params) => {
        this.playbackurl = params['embedcode'];
        this.category = params['category'];
        this.title = params['title'];
      })
      this.loadRelatedVideos(this.category);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  thunbnailURL(item){
    return 'https://img.youtube.com/vi/'+item+'/0.jpg';
  }

  videoURL(item){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+item);
  }

  loadRelatedVideos(category){
    this.videodataService.getVideoData().subscribe(data => {
      for(let i=0;i< data.user.length;i++){
        if(data.user[i].cat == category){
          this.catArr.push(data.user[i]);
        }
      }
    });
    // setTimeout(()=>{    //<<<---    using ()=> syntax
    //   this.spinnerService.hide();
    // },2000);
  }
}