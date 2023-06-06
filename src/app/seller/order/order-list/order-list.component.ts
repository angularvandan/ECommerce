import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{


  constructor(private httpService:HttpService){}
  ngOnInit(): void {
    this.onOrderList();
  }
  onOrderList(){
    this.httpService.orderList().subscribe((response)=>{
      console.log(response);
    },err=>{
      console.log(err);
    });
  }
}
