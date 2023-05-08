import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaptchaService } from 'src/app/service/captcha.service';
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
    ,private captchaService:CaptchaService){
    // this.specificUser=userService.specificUser;
    // httpService.fetchUserDetails().subscribe((response:any)=>{
    //   // console.log(response);
    //   this.specificUserByUrl=response;
    //   this.dataComingStatus=true;
    // },err=>{
    //   httpService.error.next(err.error.message);
    // });
    // this.successMessage=userService.successMessage;
    // setTimeout(()=>{
    //   userService.successMessage='';
    //   this.successMessage='';
    // },3000);
  }
  async executeCaptchaService(){
    this.captcha=await this.captchaService.execute('LOGIN');
  }
  ngOnInit(): void {
    this.executeCaptchaService()
    this.httpService.fetchUserDetails().subscribe((response:any)=>{
      // console.log(response);
      this.specificUserByUrl=response;
      this.userService.specificUserByUrl=this.specificUserByUrl;
      this.dataComingStatus=true;
    },err=>{
      this.httpService.error.next(err.error.message);
    });
    this.successMessage=this.userService.successMessage;
    setTimeout(()=>{
      this.userService.successMessage='';
      this.successMessage='';
    },3000);
  }
  onVerifyEmail(){
    this.executeCaptchaService();
    this.httpService.verifyEmail({captcha:this.captcha}).subscribe(response=>{
      console.log(response);
    },err=>{
      this.httpService.error.next(err.error.message);
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