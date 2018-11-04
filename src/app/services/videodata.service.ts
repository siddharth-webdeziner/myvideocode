import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class VideodataService {
  url: string;
  config:any;
  public messageSource = new BehaviorSubject('default message');
  VideoData:any = [];
  currentMessage = this.messageSource.asObservable();
  constructor(private http : Http) {
    this.url  = 'https://mynewapplication123.herokuapp.com/'
    //this.url  = 'http://localhost:5000/'
  }

  getVideoData(){
    this.config = {headers:  {
          'x-access-token': (localStorage.getItem('token'))
      }
    };
    //return this.http.get(this.url+"videolist", this.config).map(res => {
    return this.http.get(this.url+"videolist").map(res => {
      console.log("res.json() : ", res.json());
      this.currentMessage = res.json();
      this.VideoData = res.json();
      return res.json()
    })
  }

  mycode(){
    return "sid"
  }

  loginUser(user){
    return this.http.post(this.url+"login",{
      "username": user.username,
      "password": user.password
    }).map(res => {
      return res.json()
    })
  }

  registerUser(user){
    return this.http.post(this.url+"adduser",{
      "username": user.name,
      "email": user.email,
      "userimg": user.uploadimg,
      "password": user.password,
      "phone": user.phone
    }).map(res => {
      return res.json()
    })
  }

  addvideos(user){
    console.log("useruseruseruser : ", user);
    return this.http.post(this.url+"addvideo",{
      "videocode": user.lastCode,
      "videotitle": user.desc,
      "videocat": user.category
    }).map(res => {
      return res.json()
    })
  }

  deleteVideoData(id) {
    return this.http.post(this.url+"deletevideo/"+id,{
    }).map(res => {
      console.log("deleted");
      return res.json();
    })
  }
  saveVideoData(itemData,email){
    return this.http.post(this.url+"savevideo/",{
      "videocode": itemData.videocode,
      "videotitle": itemData.videotitle,
      "videocat": itemData.videocat,
      "emailId": email
    }).map(res => {
      console.log("saved");
      return res.json();
    })
  }

  getSavedVideoData(email){
    return this.http.post(this.url+"savedvideoslist",{
      "emailId": email
    }).map(res => {
      this.currentMessage = res.json();
      return res.json()
    })
  }

  likeVideo(id){
    return this.http.get(this.url+"likevideo").map(res => {
      this.currentMessage = res.json();
      return res.json()
    })
  }

}