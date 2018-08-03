import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddvideosComponent } from './addvideos/addvideos.component';
import { LoginComponent } from './login/login.component';
import { MyvideosComponent } from './myvideos/myvideos.component';
import { DisplayvideoComponent } from './displayvideo/displayvideo.component';

const appRoutes: Routes = [
  { 
    path: '', 
    component: MyvideosComponent
  },
  { path: 'addvideos', component: AddvideosComponent },
  { path: 'myvideos', component: MyvideosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'displayvideo', component: DisplayvideoComponent },
//   { path: '**', component: NotFoundComponent }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);