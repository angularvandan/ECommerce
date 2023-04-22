import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{
  reactiveForm!:FormGroup;
  validUser:boolean=false;
  specificUser:{}[]=[];
  allUserData:{}[]=[];


  constructor(private router:Router,private userService:UserService) {
    //below code is for redirect on my-profile
    if(userService.specificUser!=undefined){
      router.navigate(['my-profile']);
    }
  }

  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required])
    });
  }
  onSubmit(){
    // console.log(this.reactiveForm);
    let email=this.reactiveForm.get('email')?.value;
    let password=this.reactiveForm.get('password')?.value;
    this.checkUser(email,password);
  }
  checkUser(email:string,password:string){
    let data=JSON.parse(localStorage.getItem('RegisterData') || '[]');
    // console.log(data);
    this.allUserData=[];
    for(let user of data){
      if(<any>user.email===email&&<any>user.password===password){
        this.validUser=true;
        this.specificUser=user;
        //fetch isLogin status
        this.allUserData.push({...user,isLogin:true});
        //provide to service to print in myProfile
        this.userService.specificUser=this.specificUser;
      }
      else{
        this.allUserData.push(user);
      }
    }
    if(this.validUser){
      localStorage.setItem('RegisterData',JSON.stringify(this.allUserData));
      this.router.navigate(['my-profile']);
    }
  }
}
