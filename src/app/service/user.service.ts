import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
specificUser!:{}[]|undefined;
specificUserByUrl!:any;
//below three line of code for update company name
userEmail!:string;
userCompanyName!:string;
successMessage!:string;

//this below code for update users
  constructor(private toastrService:ToastrService) { 
    // console.log(this.specificUser);
    // let data=JSON.parse(localStorage.getItem('RegisterData')||'[]');
    // for(let userData of data){
    //   if(userData.isLogin===true){
    //     this.specificUser=userData;
    //   }
    // }
  }
  showSuccess(message:string) {
    this.toastrService.success(message);
  }
  showWarning(message:string) {
    this.toastrService.warning(message);
  }
}
