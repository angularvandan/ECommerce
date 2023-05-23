import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-self',
  templateUrl: './self.component.html',
  styleUrls: ['./self.component.css']
})
export class SelfComponent implements OnInit{
  user:any;
  constructor(private httpService:HttpService,private userService:UserService){}
  ngOnInit(): void {
    this.httpService.self().subscribe((response:any)=>{
      console.log(response);
      this.user=response;
    },err=>{
      console.log(err);
    },()=>{
      this.userService.loginRegisterStatus.next(true);
    });
  }
}
