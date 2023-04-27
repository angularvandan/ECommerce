import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
const appRoute:Routes=[
    {path:'auth',loadChildren:()=>import("./auth/auth.module").then(module=>module.AuthModule)},
    {path:'my-profile',loadChildren:()=>import("./home/home.module").then(module=>module.HomeModule)},
    {path:'setting',loadChildren:()=>import("./setting/setting.module").then(module=>module.SettingModule)},
];
@NgModule({
    imports:[
        RouterModule.forRoot(appRoute)
    ],
    exports:[
        RouterModule,
    ]
})
export class AppRoutingModule{}