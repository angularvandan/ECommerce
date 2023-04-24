import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponentComponent,
    RegistrationComponentComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
  
 }
