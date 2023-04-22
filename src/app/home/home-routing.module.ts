import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponentComponent } from './my-profile-component/my-profile-component.component';
import { AuthGuardGuard } from '../auth-guard.guard';
import { LoginComponentComponent } from '../auth/login-component/login-component.component';


const routes: Routes = [
  {path:'my-profile',component:MyProfileComponentComponent,canActivate:[AuthGuardGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
  constructor(){}
 }
