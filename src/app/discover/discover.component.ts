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
  

  constructor(
    
  ) { }

  ngOnInit() {
    
  }


}
