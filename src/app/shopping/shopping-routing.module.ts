import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:'',redirectTo:'products',pathMatch:'full'},
  {path:'products',component:ProductsComponent},
  {path:'auth',loadChildren:()=>import('../shopping/auth/auth.module').then(module=>module.AuthModule)},
  {path:'customer',loadChildren:()=>import('../shopping/customer/customer.module').then(module=>module.CustomerModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
