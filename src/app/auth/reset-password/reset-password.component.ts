import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  reactiveForm!: FormGroup;
  captcha!:string;
  token!:string;
  successMessage!:string;
  constructor(private userService:UserService
    ,private httpService:HttpService,private router:Router,private activatedRouter:ActivatedRoute) {
  }
  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      password:new FormControl(null,[Validators.required]),
    });
    //here git token from url
    this.activatedRouter.queryParamMap.subscribe(params=>{
      this.token=params.get('token')||'';
      if(this.token==''){
        this.router.navigate(['auth/login']);
      }
    });
  }
  onReset(){
    let password=this.reactiveForm.get('password')?.value;
    console.log(password);
    console.log('token form url',this.token);
    this.httpService.resetPassword(password,this.token).subscribe({
      next:(response:any)=>{
      console.log(response);
      this.userService.showSuccess('Password has reset');
      // console.log('password has reset');
    },
    error:(err)=>{
      this.userService.showWarning(err.error.message);

    },complete:()=>{
      this.router.navigate(['auth/login']);
    }
    });
  }
}
