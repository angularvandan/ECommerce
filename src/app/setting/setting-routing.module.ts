import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuardGuard } from '../auth-guard.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponentComponent } from './my-profile-component/my-profile-component.component';

const routes: Routes = [
  {path:'',canActivate:[AuthGuardGuard],children:[
    {path:'company',component:CompanyComponent},
    {path:'createUser',component:UserComponent},
    {path:'userList',component:UserlistComponent},
    {path:'change-password',component:ChangePasswordComponent},
    {path:'my-profile',component:MyProfileComponentComponent},
    {path:'',redirectTo:'my-profile',pathMatch:'full'}

  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
