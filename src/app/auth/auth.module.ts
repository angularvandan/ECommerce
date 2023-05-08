import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';

@NgModule({
  declarations: [
    LoginComponentComponent,
    RegistrationComponentComponent,
    AuthComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    EmailVerifyComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule {
  constructor(){
    console.log('Auth Module Loaded')
  }
 }
