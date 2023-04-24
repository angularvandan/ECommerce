import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-profile-component',
  templateUrl: './my-profile-component.component.html',
  styleUrls: ['./my-profile-component.component.css']
})
export class MyProfileComponentComponent{
  specificUser!:any;
  logOutUser:{}[]=[];
  constructor(private userService:UserService,private router:Router){
    this.specificUser=userService.specificUser;
  }
  onLogOut(){
    let data=JSON.parse(localStorage.getItem('RegisterData')||'[]');
    for(let userData of data){
      if(userData.isLogin!=true){
        this.logOutUser.push(userData);
      }
      else{
        this.logOutUser.push({...this.specificUser,isLogin:false});
      }
    }
    // console.log('Logout Works')
    //below line , for stop canActivate router
    this.userService.specificUser=undefined;
    localStorage.setItem('RegisterData',JSON.stringify(this.logOutUser));
    this.router.navigate(['auth/login']);
  }
}
