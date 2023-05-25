import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';

export interface productType{
  limit?:number,
  page:number,
  sortBy?:string,
  name?:string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  filterProducts:any[]=[];
  reactiveForm!:FormGroup;
  images!:File;
  updateProductStatus:boolean=false;
  updateImageStatus:boolean=false;
  createProductStatus:boolean=true;
  dataComingStatus:boolean=false;
  updateImageId:any;
  deleteImageId:any;
// for sorting 
  limit:number=4;
  sort:string='';
  name:string='';
  page:number=1;
  total_products!:number;

  product:productType={
    page:1,
    limit:this.limit
  }

  constructor(private http:HttpService,private userService:UserService,private router:Router){}
    ngOnInit(): void {
      this.onGetProduct();
      this.reactiveForm=new FormGroup({
        name:new FormControl(null,Validators.required),
        description:new FormControl(null,Validators.required),
        id:new FormControl(null),
        price:new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*[0-9]$')]),
      })
    }
  onGetProduct(){
    this.http.getProducts(this.product).subscribe((response:any)=>{
      console.log(response);
      // below two used in paginate 
      this.page=response.page;
      this.total_products=response.totalResults;
      this.filterProducts=response.results;
    },err=>{
      console.log(err);
    },()=>{
      this.dataComingStatus=true;
    });
  }

  onLimit(){
    this.product.limit=this.limit;
    this.product.page=1;
    this.onGetProduct();
  }
  onSort(){
    if(this.sort!=''){
      this.product.sortBy=this.sort;
      this.onGetProduct();
    }
    else{
      this.onGetProduct();
    }
  }
  onSortByName(){
    if(this.name!=''){
      this.product.page=1;
      this.product.name=this.name;
      this.name='';
      this.onGetProduct();
    }else{
      delete this.product.name;
      this.product.page=1;
      this.onGetProduct();
    }
  }
// pagination
  onPageChange(page:any){
    // console.log(page);
    this.page=page;
    this.product.page=this.page;
    this.onGetProduct();
  }

  onViewProduct(product:any){
    // console.log(id);
    let id=product._id;
    this.router.navigate(['seller/product/view-product'], { queryParams: { id: id } });
  }
  onUpdate(product:any){
    console.log(product);
    this.updateProductStatus=true;
    this.updateImageStatus=false;
    this.createProductStatus=false;

    this.reactiveForm.patchValue({
      name:product.name,
      description:product.description,
      price:product.price,
      id:product._id
    });
  }
  onUpdateProduct(product:any){
    console.log(product);

    let productPayload={
      name:product.name,
      description:product.description,
      price:product.price,
    }
    this.http.updateProducts(productPayload,product.id).subscribe((response:any)=>{
      console.log(response);
      this.userService.showSuccess('Successfully Updated')
    },err=>{
      console.log(err.error.message);
    },()=>{
      this.onGetProduct();
      this.onCancelUpdate();
    });
  }
  onCancelUpdate(){
    this.updateProductStatus=false;
    this.updateImageStatus=false;
    this.createProductStatus=true;

  }
  onDeleteProduct(id:any){
    // console.log(id);
    let status=window.confirm('Do you want to delete ?');
    if(status){
      this.http.deleteProduct(id).subscribe(()=>{
      },err=>{
        console.log(err.error.message);
      },()=>{
        this.userService.showSuccess('Successfully Deleted');
        this.onGetProduct();
      });
    }
  }

}
