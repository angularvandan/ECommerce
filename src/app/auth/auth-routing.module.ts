import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { AuthGuardGuard } from '../auth-guard.guard';

const routes: Routes = [
    {path:'register',component:RegistrationComponentComponent},
    {path:'login',component:LoginComponentComponent},
    {path:'change-password',component:ChangePasswordComponent},
    {path:'reset-password',component:ResetPasswordComponent},
    {path:'verify-email',component:EmailVerifyComponent,canActivate:[AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
