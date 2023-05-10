import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

export interface userType{
  limit?:any,
  page:any,
  sortBy?:any,
  name?:any;
}

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
  previousStatus:boolean=true;
  nextStatus:boolean=false;
  page1:boolean=false;
  page2:boolean=false;

  specificUser!:any;
  pageCount:any=1;
  pageSize!:number;
  limit:any=3;
  sortBy:any='';
  name:any='';
  totalResult!: number;


  user:userType={
    limit:this.limit,
    page: this.pageCount,
  }
  constructor(private httpService:HttpService,private router:Router,
    private render:Renderer2,private userService:UserService){
  }
  ngOnInit() {
    this.onchange();
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,[ Validators.required]),
      email:new FormControl(null,[ Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required]),
      role:new FormControl(null,[ Validators.required])
    });
  }
  onGetUsers(user:userType){
    this.httpService.getUsers(user).subscribe((response:any)=>{
      console.log(response);
      console.log(response.results.length);
      // this.pageLength=response.results.length;
      this.totalResult=response.totalResults;
      this.pageCount=response.page;
      this.pageSize=response.totalPages;
      this.userDetails=response.results;
      this.dataComingStatus=true;
      this.pageCount==1?this.previousStatus=true:this.previousStatus=false;
      this.pageCount==this.pageSize?this.page1=this.page2=this.nextStatus=true:this.page1=this.page2=this.nextStatus=false;
      this.pageCount+1>=this.pageSize?this.page2=true:this.page2=false;
      this.pageCount+2>=this.pageSize?this.nextStatus=true:this.nextStatus=false;

    },err=>{
      this.httpService.error.next(err.error.message);
      this.userService.showWarning(err.error.message);
    });
  }
  onDeleteUser(id:string){
    this.httpService.deleteUser(id).subscribe(()=>{
      // console.log('deleted successfully');
      this.userService.showSuccess('Successfully Deleted');
        this.router.navigate(['my-profile']);
    },err=>{
      this.httpService.error.next(err.error.message);
      this.userService.showWarning(err.error.message);
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
    let name=this.reactiveForm.controls['name'].value;
    let email=this.reactiveForm.controls['email'].value;
    let role=this.reactiveForm.controls['role'].value;
    let password=this.reactiveForm.controls['password'].value;
    if(this.editRoleStatus){
      this.httpService.updateUserRole(id,{role}).subscribe((res)=>{
        console.log(res);
        this.userService.showSuccess('Role updated successfully');

        setTimeout(()=>{
          this.reactiveForm.reset();
          this.router.navigate(['my-profile']);
        },2000);
      },err=>{
        this.httpService.error.next(err.error.message);
        this.userService.showWarning(err.error.message);
      });
    }
    else{
      this.httpService.updateUserDetails(id,{email,password,name}).subscribe(()=>{
        // console.log('user updated');
        this.userService.showSuccess('User updated successfully');

        setTimeout(()=>{
          this.reactiveForm.reset();
          this.router.navigate(['my-profile']);
        },2000);
      },err=>{
        this.httpService.error.next(err.error.message);
        this.userService.showWarning(err.error.message);
      });
    }
  }
  // pegination 
  // onPrevious(){
  //   if(this.pageCount>1){
  //     this.pageCount=this.pageCount-1;
  //     this.onGetUsers({...this.user,page:this.pageCount});
  //   }
    
  // }
  // onNext(){
  //   if(this.pageCount+2<this.pageSize){
  //     this.pageCount=this.pageCount+1;
  //     this.onGetUsers({...this.user,page:this.pageCount});
  //   }
  // }
  // onPage(pageCount:any){
  //   this.user.limit=this.limit;
  //   this.user.page=pageCount;
  //   this.onchange();
  // }
  onChangeSortBy(){
    if(this.sortBy!=''){
      this.user.sortBy=this.sortBy;
      this.user.page=1;
      this.pageCount=1;
      this.onchange();
    }else{
      delete this.user.name;
      this.onchange();
    }
  }
  onChangeRecord(){
    this.user.limit=this.limit;
    this.user.page=1;
    this.pageCount=1;
    this.onchange();
  }
  onChangeName(){
    if(this.name!=''){
      this.user.name=this.name;
      delete this.user.page;
      this.name='';
      this.onchange();
      // delete this.user.name;
    }
  }
  onPageChange(pageCount:any){
    this.pageCount=pageCount;
    this.onGetUsers({...this.user,page:this.pageCount});

  }
  onchange(){
    this.dataComingStatus=false;
    this.onGetUsers(this.user);
    console.log(this.user);
  }
}
