import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{
  reactiveForm!:FormGroup;
  cName!:string;
  eValue!:string;

  constructor(private router:Router, private userService:UserService,private httpService:HttpService){}

  ngOnInit():void{
    this.reactiveForm=new FormGroup({
      email:new FormControl(this.userService.userEmail),
      cName:new FormControl(this.userService.userCompanyName,[Validators.required,
        Validators.pattern('[a-zA-z]*[ a-zA-Z]+([a-zA-Z]){2}')])
    });
    this.reactiveForm.controls['email'].disable();
  }

  onChangesUserDetails(){
    this.cName=this.reactiveForm.controls['cName'].value;
    this.eValue=this.reactiveForm.controls['email'].value;
    this.httpService.updateUserCompanyDetails({email:this.eValue,name:this.cName})
    .subscribe(response=>{
      console.log(response);
      this.userService.successMessage="Company name has changed"
      this.router.navigate(['my-profile']);

    },err=>{
      this.httpService.error.next(err.error.message);
    });
  }

}
