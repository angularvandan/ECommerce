import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
const appRoute: Routes = [
    {path:'seller',loadChildren:()=>import("./seller/seller.module").then(module=>module.SellerModule)},
    {path:'shop',loadChildren:()=>import("./shopping/shopping.module").then(module=>module.ShoppingModule)},
    { path:'**',redirectTo:'auth/login',pathMatch:"full"},
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }