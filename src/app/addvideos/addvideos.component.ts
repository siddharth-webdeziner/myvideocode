import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { VideodataService } from '../services/videodata.service';

@Component({
  selector: 'app-addvideos',
  templateUrl: './addvideos.component.html',
  styleUrls: ['./addvideos.component.scss'],
  providers : [VideodataService]
})
export class AddvideosComponent implements OnInit {
  urlArr:any = [];
  title:string;
  homecharacters:any = [];
  constructor(
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public videodataService: VideodataService
  ) { 
    //this.spinnerService.show();
  }

  ngOnInit() {
    
    // setTimeout(()=>{    //<<<---    using ()=> syntax
    //   this.spinnerService.hide();
    // },2000);
    
  }

  onFormSubmit(userForm: NgForm) {
    this.urlArr.push(userForm.value);
    console.log("this.urlArrthis.urlArr : ", this.urlArr);
    this.videodataService.addvideos(this.urlArr[0]).subscribe(data => {
      console.log("dataaaaa: ", this.urlArr);
    });
    this.resetUserForm(userForm)
  }

  resetUserForm(userForm: NgForm) {
    userForm.resetForm();
  }
}
