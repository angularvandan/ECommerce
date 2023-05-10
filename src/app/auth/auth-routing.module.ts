import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { AuthGuardGuard } from '../auth-guard.guard';

const routes: Routes = [
    {path:'register',component:RegistrationComponentComponent},
    {path:'login',component:LoginComponentComponent},
    {path:'reset-password',component:ResetPasswordComponent},
    {path:'verify-email',component:EmailVerifyComponent,canActivate:[AuthGuardGuard]},
    {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
