import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  products:any[]=[];
  deliveryFee:number=0;
  totalProducts:number=0;
  totalPrice:number=0;
  orderId!:string;
  showBigImage: any;


  constructor(private httpService:HttpService,private activatedRoute:ActivatedRoute,
    private userService:UserService,private router:Router){}
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((response:any)=>{
      this.orderId=response.get('id');
    });
    console.log(this.orderId);
    this.onOrderDetails();
  }
  onOrderDetails(){
    this.httpService.orderDetails(this.orderId).subscribe((response:any)=>{
      console.log(response);
      this.products=response.items;
      this.totalProducts=this.products.length;
      this.deliveryFee=response.deliveryFee;
    },err=>{
      console.log(err.error.message)
    },()=>{
      this.onTotalPrice();
    });
  }
  onTotalPrice(){
    this.totalPrice=0;
    for(let product of this.products){
      this.totalPrice+=product.subTotal;
    }
    this.totalPrice+=this.deliveryFee;
  }
  onSmallImageClick(image:any){
    this.showBigImage=image?.url;
  }
  onCancelOrder(){
    console.log(this.orderId);
    this.httpService.cancelOrder(this.orderId).subscribe((response:any)=>{
      console.log(response);
    },err=>{
      console.log(err.error.message);
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Cancel Successfully');
      this.router.navigate(['shop/order/order-history']);
    });
  }
}
