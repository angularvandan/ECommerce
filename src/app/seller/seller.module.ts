import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';


import { SellerRoutingModule } from './seller-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerRoutingModule
  ],
})
export class SellerModule { }
