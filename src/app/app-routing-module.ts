import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { HomeModule } from "./home/home.module";
const appRoute:Routes=[
];
@NgModule({
    imports:[
        RouterModule.forRoot(appRoute),
        HomeModule,
        AuthModule
    ],
    exports:[
        RouterModule,
    ]
})
export class AppRoutingModule{}