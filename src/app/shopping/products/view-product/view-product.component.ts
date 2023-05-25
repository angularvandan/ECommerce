import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

  productId:any;
  product:any;
  showBigImage: any;
  constructor(private httpService:HttpService,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((response:any)=>{
      this.productId=response.get('id');
    });
    this.onGetProduct();
  }
  onGetProduct(){
    this.httpService.getProduct(this.productId).subscribe((response:any)=>{
      console.log(response);
      this.product=response;
      this.showBigImage=this.product.images[0]?.url;
    },err=>{
      console.log(err.error.message);
    },()=>{
    })
  }
  onSmallImageClick(image:any){
    this.showBigImage=image?.url;
  }
}
