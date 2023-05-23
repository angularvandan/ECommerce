import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { UserService } from '../service/user.service';

export interface productType{
  page:number,
  limit:number,
  sortBy?:string,
  name?:string
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products:any[]=[];
  page:number=1;
  limit:number=8;
  totalProducts!:number;
  sortBy:string='';
  name:string='';

  productPerms:productType={
    page:this.page,
    limit:this.limit
  }

  constructor(private httpService:HttpService,private userService:UserService){
    let token=JSON.parse(localStorage.getItem('CustomerToken')||'[]');
    if(token!=''){
      this.userService.loginRegisterStatus.next(true);
    }  
  }

  ngOnInit(): void {
    this.onGetAllProducts();
  }
  onGetAllProducts(){
    this.httpService.getAllProducts(this.productPerms).subscribe((response:any)=>{
      console.log(response);
      this.products=response.results;
      this.totalProducts=response.totalResults;
    },err=>{
      console.log(err.error.message);
    });
  }
  pageChanged(page:any){
    this.page=page;
    this.productPerms.page=page;
    this.onGetAllProducts();
  }
  onLimit(){
    this.productPerms.limit=this.limit;
    this.onGetAllProducts();
  }
  onSortBy(){
    if(this.sortBy!=''){
      this.productPerms.sortBy=this.sortBy;
      this.onGetAllProducts();
    }
    else{
      delete this.productPerms.sortBy;
      this.onGetAllProducts();
    }
  }
  onSortByName(){
    if(this.name!=''){
      this.page=1;
      this.productPerms.name=this.name;
      this.productPerms.page=this.page;
      delete this.productPerms.sortBy;
      this.name='';
      this.onGetAllProducts();
    }
    else{
      this.sortBy='';
      delete this.productPerms.name;
      delete this.productPerms.sortBy;
      this.onGetAllProducts();
    }
  }
}
