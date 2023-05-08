import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuardGuard } from '../auth-guard.guard';

const routes: Routes = [
  {path:'company',component:CompanyComponent,canActivate:[AuthGuardGuard]},
  {path:'createUser',component:UserComponent,canActivate:[AuthGuardGuard]},
  {path:'userList',component:UserlistComponent,canActivate:[AuthGuardGuard]},
  // {path:'profile',component:p}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
