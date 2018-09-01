import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRouting } from './app.routing.module';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
// Social login
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";

// import social buttons module
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';


import { AppComponent } from './app.component';
import { AddvideosComponent } from './addvideos/addvideos.component';
import { MyvideosComponent } from './myvideos/myvideos.component';
import { NewvideosDirective } from './directives/newvideos.directive';
import { SqrtPipe } from './pipe/sqrt'
import { FilterPipe} from './filter.pipe';
import { VideoFilterPipe} from './videofilter.pipe';
import { LoginComponent } from './login/login.component';
import { DisplayvideoComponent } from './displayvideo/displayvideo.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { SavedvideoComponent } from './savedvideo/savedvideo.component';
import { FooterComponent } from './footer/footer.component';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2021745131182721")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("964106961942-reabant37tlnv5el8f80ndqvc5sjvju5.apps.googleusercontent.com")
        },
      ]);
  return config;
}

@NgModule({
  declarations: [
    SqrtPipe,
    AppComponent,
    AddvideosComponent,
    MyvideosComponent,
    NewvideosDirective,
    FilterPipe,
    VideoFilterPipe,
    LoginComponent,
    DisplayvideoComponent,
    HeaderComponent,
    LoaderComponent,
    RegisteruserComponent,
    SavedvideoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    FormsModule,
    HttpClientModule,
    HttpModule,
    SocialLoginModule,
    JwSocialButtonsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
