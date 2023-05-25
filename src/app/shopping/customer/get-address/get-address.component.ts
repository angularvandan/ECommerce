import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-address',
  templateUrl: './get-address.component.html',
  styleUrls: ['./get-address.component.css']
})
export class GetAddressComponent implements OnInit{

  allAddress:any[]=[];

  constructor(private userService:UserService,private httpService:HttpService,
    private router:Router){
    this.userService.loginRegisterStatus.next(true);
  }
  ngOnInit(): void {
    
  this.getAddress();
  }
  getAddress(){
    this.httpService.getSavedAddress().subscribe((response:any)=>{
      console.log(response);
      this.allAddress=response;
    },err=>{
      console.log(err);
    });
  }
  onUpdateAddress(addressId:any){
    this.router.navigate(['shop/customer/update-address'],{queryParams:{id:addressId}})
  }
  onDeleteAddress(addressId:any){
    console.log(addressId);
    let confirm=window.confirm('Do you want to delete address ?');
    if(confirm){
      this.httpService.deleteAddress(addressId).subscribe((response:any)=>{
        console.log(response);
      },err=>{
        console.log(err);
      },()=>{
        this.userService.showSuccess('Deleted Successfully');
        this.getAddress();
      });
    }
  }

}
