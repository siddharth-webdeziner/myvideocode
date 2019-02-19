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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers : [VideodataService]
})
export class LoginComponent implements OnInit {
  loginToken:any = [];
  constructor(
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    public videodataService: VideodataService,
    private socialAuthService: AuthService
  ) {
    //this.spinnerService.show();
  }

  ngOnInit() {
    // setTimeout(()=>{    //<<<---    using ()=> syntax
    //   this.spinnerService.hide();
    // },2000);
  }

  adminLoginSubmit(userForm: NgForm) {
    var loginArr = [];
    localStorage.removeItem("LoginData");
    loginArr.push(userForm.value);
    this.videodataService.loginUser(userForm.value).subscribe(data => {
      if(data.token){
        this.router.navigateByUrl('/myvideos');
        localStorage.setItem("userObj",JSON.stringify(data.userObj[0]));
        localStorage.setItem("token",JSON.stringify(data.token));
      }
    });
  }

  socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
          this.videodataService.registerUser(userData).subscribe(data => {
            if(data.userObj[0]) {
              this.router.navigateByUrl('/myvideos');
              localStorage.setItem("userObj",JSON.stringify(data.userObj[0]));
              localStorage.setItem("token",JSON.stringify(data.token));
            }
          });
      }
    );
  }

}