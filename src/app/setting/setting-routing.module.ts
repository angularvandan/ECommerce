import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {path:'company',component:CompanyComponent},
  {path:'createUser',component:UserComponent},
  {path:'userList',component:UserlistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
