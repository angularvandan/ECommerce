import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-account',
  templateUrl: './remove-account.component.html',
  styleUrls: ['./remove-account.component.css']
})
export class RemoveAccountComponent implements OnInit{

  constructor(private httpService:HttpService,private userService:UserService,
    private router:Router){
  }
  ngOnInit(): void {
    this.httpService.removeAccount().subscribe((response:any)=>{
      console.log(response);
    },err=>{
      console.log(err.error.message);
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Successfully Removed');
      this.userService.loginRegisterStatus.next(false);
      localStorage.removeItem('CustomerToken');
      this.router.navigate(['shop/auth/login']);
    });
  }
}
