import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
specificUser!:{}[]|undefined;
specificUserByUrl!:any;
//below three line of code for update company name
userCompanyName!:string;
nav=new BehaviorSubject<boolean>(true);
//this below code for update users
  constructor(private toastrService:ToastrService) {}
  showSuccess(message:string) {
    this.toastrService.success(message);
  }
  showWarning(message:string) {
    this.toastrService.warning(message);
  }
}
