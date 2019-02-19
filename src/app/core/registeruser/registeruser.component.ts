import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { VideodataService } from '../../services/videodata.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.scss'],
  providers : [VideodataService]
})
export class RegisteruserComponent implements OnInit {
  errorMsg:boolean;
  successMsg:boolean;

  constructor(
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public videodataService: VideodataService,
    private socialAuthService: AuthService
  ) { }

  ngOnInit() {
  }

  registerSubmit(userForm: NgForm){
    var loginArr = [];
    loginArr.push(userForm.value);
    this.videodataService.registerUser(userForm.value).subscribe(data => {
      console.log("data : ",data.response)
      if(data.response == 'error') {
        this.errorMsg = true;
        this.successMsg = false;
      } else {
        this.errorMsg = false;
        this.successMsg = true;
      }
      userForm.reset();
    });
  }

}
