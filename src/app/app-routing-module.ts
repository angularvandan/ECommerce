import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
const appRoute: Routes = [
    { path:'',redirectTo:'auth/login',pathMatch:"full"},
    { path: 'auth', component: AuthComponent, loadChildren: () => import("./auth/auth.module").then(module => module.AuthModule) },
    { path: 'setting',loadChildren: () => import("./setting/setting.module").then(module => module.SettingModule) },
    { path: 'products',loadChildren:()=> import("./product/product.module").then(module=>module.ProductModule)},
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