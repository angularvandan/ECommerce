import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-profile-component',
  templateUrl: './my-profile-component.component.html',
  styleUrls: ['./my-profile-component.component.css']
})
export class MyProfileComponentComponent implements OnInit{
  specificUser!:any;
  specificUserByUrl!:any;
  dataComingStatus:boolean=false;
  logOutUser:{}[]=[];
  successMessage!:string;

  cName!:string;
  eValue!:string;
  captcha!:string;
  

  @ViewChild('textFocus')textFocus!:ElementRef;
  @ViewChild('emailValue')emailValue!:ElementRef;

  constructor(private userService:UserService,private router:Router
    ,private httpService:HttpService,private activatedRouter:ActivatedRoute
    ){
      var ele: any = document.querySelector('.grecaptcha-badge');
      // console.log(ele);
      if(ele!=null){
        ele.style.display = 'none';
      }
  }
  ngOnInit(): void {
    this.httpService.fetchUserDetails().subscribe((response:any)=>{
      // console.log(response);
      this.specificUserByUrl=response;
      this.userService.specificUserByUrl=this.specificUserByUrl;
      this.dataComingStatus=true;
    },err=>{
      this.userService.showWarning(err.error.message);
    });
  }
  onVerifyEmail(){
    this.httpService.verifyEmail().subscribe(response=>{
      console.log(response);
      this.userService.showSuccess('Link has send');
    },err=>{
      this.httpService.error.next(err.error.message);
      this.userService.showWarning(err.error.message);
    });
  }
  onLogOut(){
    // let data=JSON.parse(localStorage.getItem('RegisterData')||'[]');
    // for(let userData of data){
    //   if(userData.isLogin!=true){
    //     this.logOutUser.push(userData);
    //   }
    //   else{
    //     this.logOutUser.push({...this.specificUser,isLogin:false});
    //   }
    // }
    // console.log('Logout Works')
    //below line , for stop canActivate router
    // this.userService.specificUser=undefined;
    // localStorage.setItem('RegisterData',JSON.stringify(this.logOutUser));
    // this.router.navigate(['auth/login']);

    localStorage.removeItem('token1');
    // this.router.navigate(['auth']);
    this.router.navigate(['auth/login']);
  }
  onEditUsersDetails(){
    setTimeout(()=>{
      this.cName=this.textFocus.nativeElement.value;
      this.eValue=this.emailValue.nativeElement.value;

      this.userService.userEmail=this.eValue;
      this.userService.userCompanyName=this.cName;
      this.router.navigate(['setting/company']);
    },0);
  }
  onUsersDetails(){
    this.router.navigate(['setting/createUser']);
  }
  
}