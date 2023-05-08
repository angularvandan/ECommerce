import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit{
  
  token!:string;
  constructor(private router:Router ,private routeActivated:ActivatedRoute
    ,private httpService:HttpService,private userService:UserService){

  }
  ngOnInit(): void {
    this.routeActivated.queryParamMap.subscribe(params=>{
      this.token=params.get('token')||'';
      console.log(this.token);
      console.log('email success');
      this.onVerifyAccount();
    },err=>{
      this.httpService.error.next(err.error.message);
    });
  }
  onVerifyAccount(){
    this.httpService.verifyAccount(this.token).subscribe(response=>{
      this.userService.successMessage="Email has verified"
      
    },err=>{
      this.httpService.error.next(err.error.message);
    },()=>{
      this.router.navigate(['my-profile']);
    })
  }

}