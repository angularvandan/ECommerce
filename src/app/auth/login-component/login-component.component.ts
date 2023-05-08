import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';
import { Login } from '../Model/login';
import { CaptchaService } from 'src/app/service/captcha.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ReCaptchaV3Service } from 'ng-recaptcha';

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
      this.router.navigate(['my-profile']);
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
      this.httpService.error.next(err.error.message);
      this.executeCaptchaService();
    },
    complete:()=>{
      this.router.navigate(['my-profile']);
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
      },(err)=>{
        this.httpService.error.next(err.error.message);
      },()=>{
        this.router.navigate(['my-profile']);
      });
    });
  }

  onForgot(){
    let email=this.forgot_email;
    this.forgot_email='';
    console.log(email);
    this.httpService.forgotPassword({email:email,captcha:this.captcha}).subscribe((response:any)=>{
      console.log(response);
      this.executeCaptchaService();
    },(err)=>{
      this.httpService.error.next(err.error.message);
      this.executeCaptchaService();
    });    
  }

  checkUser(email:string,password:string){
    let data=JSON.parse(localStorage.getItem('RegisterData')||'[]');
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
