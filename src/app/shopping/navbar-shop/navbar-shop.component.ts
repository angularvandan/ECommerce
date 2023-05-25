import { Component, OnChanges, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-navbar-shop',
  templateUrl: './navbar-shop.component.html',
  styleUrls: ['./navbar-shop.component.css']
})
export class NavbarShopComponent implements OnInit{
  shopNavbarStatus:boolean=false;
  loginRegisterStatus:boolean=false;
  constructor(private router:Router,private userService:UserService,private httpService:HttpService){
  }
  ngOnInit(): void {
    let token=JSON.parse(localStorage.getItem('CustomerToken')||'[]');
      if(token!=''){
        this.userService.loginRegisterStatus.next(true);
      }
    this.userService.loginRegisterStatus.subscribe((response:any)=>{
      this.loginRegisterStatus=response;
    });
  }
  onLogOut(){
    this.loginRegisterStatus=false;
    this.userService.loginRegisterStatus.next(false);
    localStorage.removeItem('CustomerToken');
    this.userService.showSuccess('Successfully Logout');
    this.router.navigate(['shop/auth/login']);
  }
  onDeleteAccount(){
    let confirm=window.confirm('Do you want to delete your account ?');
    if(confirm){
      this.router.navigate(['shop/customer/remove-account']);
    }
  }
}
