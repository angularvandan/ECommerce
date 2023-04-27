import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MyProfileComponentComponent } from './my-profile-component/my-profile-component.component';


@NgModule({
  declarations: [
    MyProfileComponentComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports:[]
})
export class HomeModule {
  constructor(){
    console.log('home Module Loaded')
  }
 }
