import { Directive, ElementRef, Input, ViewChild } from '@angular/core';

@Directive({
  selector: '[appVideoupdateurl]'
})
export class VideoupdateurlDirective {
  videoId;
  @Input() videoUrl: string;
  @ViewChild('video') myDivElementRef: ElementRef;
  playerVars = {
    cc_lang_pref: 'en'
  };
  constructor(
    //Element: ElementRef
  ) {
   }

   ngOnInit(){
    console.log("Element: ",this.videoUrl);
    document.getElementById("video").innerHTML = `<youtube-player [videoId]='5X7WWVTrBvM' (ready)='savePlayer($event)' (change)='onStateChange($event)' [playerVars]='playerVars'></youtube-player>`;
   }

}
