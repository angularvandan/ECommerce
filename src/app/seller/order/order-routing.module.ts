import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderActionsComponent } from './order-actions/order-actions.component';

const routes: Routes = [
  {path:'',component:OrderListComponent},
  {path:'order-list',component:OrderListComponent},
  {path:'order-details',component:OrderDetailsComponent},
  {path:'order-action',component:OrderActionsComponent},
  {path:'**',component:OrderListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
