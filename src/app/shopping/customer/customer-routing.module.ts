import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfComponent } from './self/self.component';
import { GuardGuard } from '../guard/guard.guard';

const routes: Routes = [
  {path:'',canActivate:[GuardGuard],children:[
    {path:'profile',component:SelfComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
