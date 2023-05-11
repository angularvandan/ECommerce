import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';
import { Login } from '../Model/login';
import { CaptchaService } from 'src/app/service/captcha.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

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
  loginUserByUrl!:Login;
  tokenValue:string='';
  errMessage!:string;
  captcha!:string;
  googleData!:{token:string,captcha:string};
  forgot_email!:any;


  constructor(private router:Router,private userService:UserService,
    private httpService:HttpService,private captchaService:CaptchaService
    ,private socialAuthService: SocialAuthService) {
    //below code is for redirect on my-profile
    // if(userService.specificUser!=undefined){
    //   router.navigate(['my-profile']);
    // }
    let token=JSON.parse(<string>localStorage.getItem('token1'));
    if(token!=null){
      this.router.navigate(['setting/my-profile']);
      setTimeout(() => {
        var ele: any = document.querySelector('.grecaptcha-badge');
        // console.log(ele);
        if(ele!=null){
          ele.style.display = 'none';
        }
      }, 1000);
    }
  }

  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required])
    });
    this.httpService.error.subscribe(err=>{
      this.errMessage=err;
      setTimeout(()=>{
        this.errMessage='';
      },3000);
    });
    this.executeCaptchaService();
  }
  async executeCaptchaService(){
    this.captcha=await this.captchaService.execute('LOGIN');
  }
  onSubmit(){
    // console.log(this.reactiveForm);
    // let email=this.reactiveForm.get('email')?.value;
    // let password=this.reactiveForm.get('password')?.value;
    // this.checkUser(email,password);
    this.loginUserByUrl={
      email:this.reactiveForm.get('email')?.value,
      password:this.reactiveForm.get('password')?.value,
      captcha:this.captcha
    }
    this.httpService.createLogin(this.loginUserByUrl).subscribe({
      next:(response:any)=>{
      console.log(response);
      this.tokenValue=response.token;
      localStorage.setItem('token1',JSON.stringify(this.tokenValue));
      // if(this.tokenValue!=''){
      //   // this.router.navigate(['my-profile']);
      // }
      this.executeCaptchaService();

    },
    error:(err)=>{
      this.executeCaptchaService();
      this.userService.showWarning(err.error.message);
    },
    complete:()=>{
      this.userService.showSuccess('Login Successfully');
      this.router.navigate(['setting/my-profile']);
    }
    });

  }
  onGoogleSignIn(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response)=>{
      console.log(response);
      let token=response.idToken;
      this.httpService.googleSignIn({token:token,captcha:this.captcha}).subscribe((response:any)=>{
        console.log(response);
        this.tokenValue=response.token;
        localStorage.setItem('token1',JSON.stringify(this.tokenValue));
        this.userService.showSuccess('Login Successfully');

      },(err)=>{
        this.httpService.error.next(err.error.message);
        this.userService.showWarning(err.error.message);

      },()=>{
        this.router.navigate(['/setting/my-profile']);
      });
    });
  }

  onForgot(){
    let email=this.forgot_email;
    this.forgot_email='';
    console.log(email);
    this.httpService.forgotPassword({email:email,captcha:this.captcha}).subscribe((response:any)=>{
      // console.log(response);
      this.userService.showSuccess('Email has send');
      this.executeCaptchaService();

    },(err)=>{
      this.httpService.error.next(err.error.message);
      this.userService.showSuccess(err.error.message);
      this.executeCaptchaService();
    });    
  }
}
