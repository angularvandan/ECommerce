import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ViewProductComponent } from './products/view-product/view-product.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ViewProductComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ShoppingModule { }
