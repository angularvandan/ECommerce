import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css']
})
export class RegistrationComponentComponent implements OnInit{
  reactiveForm!:FormGroup;
  registerData:{}[]=[];

  constructor(private router:Router,userService:UserService){
    // fetch data from local storage every timeInterval
    let data=JSON.parse(localStorage.getItem('RegisterData')||'[]');
    this.registerData=data;
    //below code is for redirect on my-profile
    if(userService.specificUser!=undefined){
      router.navigate(['my-profile']);
    }
  }

  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,[Validators.required,
        Validators.pattern('[a-zA-z]*[ a-zA-Z]+([a-zA-Z]){2}')]),
      cName:new FormControl(null,[Validators.required,
        Validators.pattern('[a-zA-z]*[ a-zA-Z]+([a-zA-Z]){2}')]),
      role:new FormControl(null,[Validators.required,
        Validators.pattern('^[a-zA-z]+[. a-zA-Z]+([a-zA-Z]){2}$')]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required]),
      isLogin:new FormControl(false)
    });

  }
  onSubmit(){

    // console.log(this.reactiveForm);
    // push the data into out Property
    this.registerData.push(this.reactiveForm.value);
    this.pushLocalStorage(this.registerData);
    this.reactiveForm.reset();
    this.onNavigateLogin()
  }
  onNavigateLogin(){
    console.log('Auth/login')
    this.router.navigate(['auth/login']);
  }
  pushLocalStorage(data:object){
    localStorage.setItem('RegisterData',JSON.stringify(data));
  }
}
