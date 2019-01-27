import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { VideodataService } from '../services/videodata.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  providers : [VideodataService]
})
export class DiscoverComponent implements OnInit {
  paramsSubscription;
  catArr;
  category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public videodataService: VideodataService,
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .subscribe((params) => {
        this.category = params['category'];
        this.videodataService.getVideoData().subscribe(data => {
          console.log("data.videolist.lengthdata.videolist.length", data.videolist.length)
          this.catArr = data.videolist;
          //this.category = category;
        }); 
      })
  }

  thunbnailURL(item){
    return 'https://img.youtube.com/vi/'+item+'/0.jpg';
  }

  openVideo(item){
    this.router.navigate(['displayvideo', { itemData: item._id}]);
  }


}
