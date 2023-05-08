import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
const appRoute: Routes = [
    { path: 'my-profile', loadChildren: () => import("./home/home.module").then(module => module.HomeModule) },
    { path:'',redirectTo:'auth/login',pathMatch:"full"},
    { path: 'auth', component: AuthComponent, loadChildren: () => import("./auth/auth.module").then(module => module.AuthModule) },
    { path: 'setting', loadChildren: () => import("./setting/setting.module").then(module => module.SettingModule) },
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