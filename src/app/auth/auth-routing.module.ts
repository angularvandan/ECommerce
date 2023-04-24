import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';

const routes: Routes = [
  {path:'',redirectTo:'auth/login',pathMatch:'full'},
  {path:"auth",children:
    [
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'register',component:RegistrationComponentComponent},
      {path:'login',component:LoginComponentComponent},
      {path:'**',redirectTo:'auth/login',pathMatch:'full'}
    ]},
  {path :'**',redirectTo:'auth/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
