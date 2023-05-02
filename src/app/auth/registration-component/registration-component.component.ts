import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';
import { Register } from '../Model/register';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.css']
})
export class RegistrationComponentComponent implements OnInit{
  reactiveForm!:FormGroup;
  registerData:{}[]=[];
  registerDataByUrl!:Register;
  tokenValue:string[]=[];
  errMessage!:string;

  constructor(private router:Router,userService:UserService,private httpService:HttpService){
    // fetch data from local storage every timeInterval
    // let data=JSON.parse(localStorage.getItem('RegisterData')||'[]');
    // this.registerData=data;
    // below code is for redirect on my-profile
    // if(userService.specificUser!=undefined){
    //   router.navigate(['my-profile']);
    // }
    let token= localStorage.getItem('token1');
    if(token!=null){
      this.router.navigate(['my-profile']);
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

    this.httpService.error.subscribe(err=>{
      this.errMessage=err;
      setTimeout(()=>{
        this.errMessage='';
      },3000);
    });

  }
  onSubmit(){
    // console.log(this.reactiveForm);
    // push the data into out Property
    this.registerDataByUrl={
      email:this.reactiveForm.value.email,
      password:this.reactiveForm.value.password,
      name:this.reactiveForm.value.name,
      company:this.reactiveForm.value.cName
    }

    this.httpService.createRegister(this.registerDataByUrl).subscribe((response:any)=>{
      console.log(response.token);
      this.tokenValue.push(response.token);
      localStorage.setItem('token',JSON.stringify(this.tokenValue));
      this.onNavigateLogin()
    },err=>{
      this.httpService.error.next(err.error.message);
    });
    
    this.registerData.push(this.reactiveForm.value);
    // this.pushLocalStorage(this.registerData);
    this.reactiveForm.reset();
    // this.onNavigateLogin();
  }
  onNavigateLogin(){
    // console.log('Auth/login')
    this.router.navigate(['auth/login']);
  }
  pushLocalStorage(data:object){
    localStorage.setItem('RegisterData',JSON.stringify(data));
  }
}
