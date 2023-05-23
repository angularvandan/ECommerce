import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { CaptchaService } from '../../service/captcha.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  reactiveForm!:FormGroup;
  captcha:any;
  payLoad={
    name:'',
    email:'',
    password:'',
    address:'',
    captcha:''
  };
  constructor(private httpService:HttpService,
    private userService:UserService,private captchaService:CaptchaService,private router:Router){
      let token=JSON.parse(localStorage.getItem('CustomerToken')||'[]');
      if(token!=''){
        router.navigate(['shop/customer/profile']);
      }
    }

  async executeCaptchaService(){
    this.captcha=await this.captchaService.execute('register');
    // console.log(this.captcha);
  }
  ngOnInit(): void {

    this.executeCaptchaService();

    this.reactiveForm=new FormGroup({
      name:new FormControl(null,[Validators.required,Validators.pattern('[a-zA-z]*[ a-zA-Z]+([a-zA-Z]){2}')]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,Validators.required),
      confirmPassword:new FormControl(null,Validators.required),

      address:new FormGroup({
        street:new FormControl(null,Validators.required),
        addressLine2:new FormControl(null,Validators.required),
        state:new FormControl(null,Validators.required),
        city:new FormControl(null,Validators.required),
        pin:new FormControl(null,[Validators.required,Validators.pattern('[0-9]+([0-9]){5}')]),
      })
    });
  }
  onRegister(){
    if(this.reactiveForm.get('password')?.value==this.reactiveForm.get('confirmPassword')?.value){
      this.payLoad={
        name:this.reactiveForm.get('name')?.value,
        email:this.reactiveForm.get('email')?.value,
        password:this.reactiveForm.get('password')?.value,
        address:this.reactiveForm.get('address')?.value,
        captcha:this.captcha
      }
      console.log(this.payLoad);
      this.httpService.register(this.payLoad).subscribe((response)=>{
        // console.log(response);
        this.userService.showSuccess('Register Successfully')
      },err=>{
        // console.log(err);
        this.userService.showWarning(err.error.message);
      },()=>{
        this.reactiveForm.reset();
      });
    }
    else{
      this.userService.showWarning('Confirm Password must be same!');
    }
  }
}