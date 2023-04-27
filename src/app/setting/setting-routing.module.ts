import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './userlist/userlist.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {path:'company',component:CompanyComponent},
  {path:'createUser',component:UserComponent},
  {path:'userList',component:UserlistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes),NgxPaginationModule],
  exports: [RouterModule,NgxPaginationModule]
})
export class SettingRoutingModule { }
