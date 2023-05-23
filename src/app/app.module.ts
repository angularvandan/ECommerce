import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing-module';
import {HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './seller/navbar/navbar.component';
import { NavbarShopComponent } from './shopping/navbar-shop/navbar-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarShopComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000
    })
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
