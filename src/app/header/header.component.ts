import { Component, OnInit, Renderer2, Inject  } from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  auth:any;
  id:boolean;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = false;
    if(localStorage.getItem("selectedTheme") == "darkTheme"){
      this.document.body.classList.remove('lightTheme');
      this.document.body.classList.add('darkTheme');
      localStorage.setItem("selectedTheme", "darkTheme");
    } else {
      this.document.body.classList.remove('darkTheme');
      this.document.body.classList.add('lightTheme');
      localStorage.setItem("selectedTheme", "lightTheme");
    }
    this.auth = JSON.parse(localStorage.getItem('userObj'));
  }

  changeTheme(){
    if(localStorage.getItem("selectedTheme") == "lightTheme"){
      this.document.body.classList.remove('lightTheme');
      this.document.body.classList.add('darkTheme');
      localStorage.setItem("selectedTheme", "darkTheme");
    } else {
      this.document.body.classList.remove('darkTheme');
      this.document.body.classList.add('lightTheme');
      localStorage.setItem("selectedTheme", "lightTheme");
    }
  }

  logout(){
    localStorage.removeItem("userObj");
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }

  openprofile(){
    this.id = !(this.id);
  }

}
