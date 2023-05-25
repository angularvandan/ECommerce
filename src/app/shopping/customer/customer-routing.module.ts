import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfComponent } from './self/self.component';
import { GuardGuard } from '../guard/guard.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RemoveAccountComponent } from './remove-account/remove-account.component';

const routes: Routes = [
  {path:'',canActivate:[GuardGuard],children:[
    {path:'profile',component:SelfComponent},
    {path:'change-password',component:ChangePasswordComponent},
    {path:'remove-account',component:RemoveAccountComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
