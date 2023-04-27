import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toArray } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{

  dataComingStatus:boolean=false;
  // userDetails:{[key:string]:string}[]=[];
  userDetails:any=[];
  successMessage!:string;
  reactiveForm!:FormGroup;
  editUserStatus:boolean=false;
  editRoleStatus:boolean=false;
  containerStatus:boolean=false;
  specificUser!:any;
  pageCount:any=1;
  pageSize:any=3;
  limit:any=3;


  constructor(private httpService:HttpService,private router:Router){}
  ngOnInit() {
    this.onchange();
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,[ Validators.required]),
      email:new FormControl(null,[ Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required]),
      role:new FormControl(null,[ Validators.required])
    });
  }
  onGetUsers(user:{limit:string}){
    this.httpService.getUsers(user).subscribe((response:any)=>{
      console.log(response.results);
      this.userDetails=response.results;
      this.dataComingStatus=true;
    },err=>{
      this.httpService.error.next(err.error.message);
    });
  }
  onDeleteUser(id:string){
    this.httpService.deleteUser(id).subscribe(()=>{
      console.log('deleted successfully');
      this.successMessage="Deleted successfully"
      setTimeout(()=>{
        this.successMessage=''
      },3000);
    },err=>{
      this.httpService.error.next(err.error.message);
    });
  }
  editUser(user:object){
    this.editUserStatus=true;
    this.editRoleStatus=false;
    this.containerStatus=true;
    this.specificUser=user;

    this.reactiveForm.patchValue({
      name:this.specificUser.name,
      email:this.specificUser.email,
      role:this.specificUser.role
    });
    this.reactiveForm.controls['role'].disable();

  }
  editRole(user:object){
    this.editUserStatus=false;
    this.editRoleStatus=true;
    this.containerStatus=true;
    this.specificUser=user;

    this.reactiveForm.patchValue({
      name:this.specificUser.name,
      email:this.specificUser.email,
      role:this.specificUser.role
    });
    this.reactiveForm.controls['name'].disable();
    this.reactiveForm.controls['email'].disable();
  }
  onUpdateUser(){
    let id=this.specificUser._id;
    let name=<string>this.specificUser.name;
    let email=this.reactiveForm.controls['email'].value;
    let role=this.reactiveForm.controls['role'].value;
    let password=this.reactiveForm.controls['password'].value;
    if(this.editRoleStatus){
      this.httpService.updateUserRole(id,{role}).subscribe((res)=>{
        console.log(res);
        this.successMessage='Role updated successfully';
        setTimeout(()=>{
          this.successMessage=''
          this.reactiveForm.reset();
          this.router.navigate(['my-profile']);
        },2000);
      },err=>{
        this.httpService.error.next(err.error.message);
      });
    }
    else{
      this.httpService.updateUserDetails(id,{email,password,name}).subscribe(()=>{
        console.log('user updated');
        this.successMessage='User updated successfully';
        setTimeout(()=>{
          this.successMessage='';
          this.reactiveForm.reset();
          this.router.navigate(['my-profile']);
        },2000);
      },err=>{
        this.httpService.error.next(err.error.message);
      });
    }
  }
  // pegination 
  onPrevious(){
      this.pageCount=this.pageSize-1;
  }
  onNext(){
      this.pageCount=this.pageSize+1;
  }
  onPage(pageSize:any){
    console.log(pageSize);
    this.pageCount=pageSize;
    this.onchange();
  }
  onchange(){
    let user={
      limit:this.limit,
      page:this.pageCount
    }
    this.onGetUsers(user);
    console.log(user);
  }
}
