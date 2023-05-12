import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  reactiveForm!:FormGroup;
  successMessage!:string;
  isCollapsed:boolean=false;
  role:string='user';

  constructor(private httpService:HttpService,private router:Router
    ,private userService:UserService){

  }

  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,[ Validators.required]),
      email:new FormControl(null,[ Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required]),
      role:new FormControl(null,[ Validators.required])
    });
  }
  onCreateUser(){
    console.log(this.reactiveForm);
    this.httpService.createUser(this.reactiveForm.value).subscribe(response=>{
      console.log(response);
      this.userService.showSuccess('User has Added')
      this.router.navigate(['my-profile']);
    },(err)=>{
      this.httpService.error.next(err.error.message);
      this.userService.showWarning(err.error.message);
    });
    setTimeout(()=>{
      this.reactiveForm.reset();
    },2000);
  }
}
