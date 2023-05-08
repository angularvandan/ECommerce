import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  reactiveForm!: FormGroup;
  changesData!:{old_password:string,new_password:string};
  successMessage!:string;

  constructor(private userService:UserService,private httpService:HttpService
    ,private router:Router){}
  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      email:new FormControl(this.userService.specificUserByUrl.email),
      password1:new FormControl(null,[Validators.required]),
      password2:new FormControl(null,[Validators.required])
    });
    this.reactiveForm.controls['email'].disable();

  }
  onChange(){
    this.changesData={
      old_password:this.reactiveForm.get('password1')?.value,
      new_password:this.reactiveForm.get('password2')?.value,
    }
    this.httpService.changePassword(this.changesData).subscribe({
      next:(response:any)=>{
      console.log(response);
      this.successMessage="Password has changed"
      setTimeout(()=>{
        this.router.navigate(['my-profile']);
      },2000);
    },
    error:(err)=>{
      this.httpService.error.next(err.error.message);
    },
    });
  }

}
