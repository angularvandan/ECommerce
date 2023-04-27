import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponentComponent } from './my-profile-component/my-profile-component.component';
import { AuthGuardGuard } from '../auth-guard.guard';


const routes: Routes = [
  {path:'',component:MyProfileComponentComponent,canActivate:[AuthGuardGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

 }
