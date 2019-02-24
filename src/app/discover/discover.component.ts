import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { VideodataService } from '../services/videodata.service';
import { categoriesItems } from '../constant/categories'

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  providers : [VideodataService]
})
export class DiscoverComponent implements OnInit {
  categoriesItems = categoriesItems;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    
  }

  viewAll(cat){
    this.router.navigate(['explorelist', { category: cat}]);
  }


}
