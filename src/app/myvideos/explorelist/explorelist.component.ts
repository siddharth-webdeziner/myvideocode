import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { VideodataService } from '../../services/videodata.service';


@Component({
  selector: 'app-explorelist',
  templateUrl: './explorelist.component.html',
  styleUrls: ['./explorelist.component.scss'],
  providers : [VideodataService]
})
export class ExplorelistComponent implements OnInit {
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
