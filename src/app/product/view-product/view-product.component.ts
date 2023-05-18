import { HttpSentEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

  reactiveForm!:FormGroup;
  productId:any;
  product:any;
  viewStatus:boolean=false;
  showBigImage:any;

  bigImageId!:any;
  images:any[]=[];
  deleteImageId:any;

  constructor(private http:HttpService, private userService:UserService,private activatedRoute:ActivatedRoute){
  }
  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,Validators.required),
      description:new FormControl(null),
      images:new FormControl(null),
      price:new FormControl(null),
    })
    this.reactiveForm.disable();
    this.activatedRoute.queryParamMap.subscribe((response:any)=>{
      // console.log(response);
      this.productId=response.get('id');
    });
    this.onGetProduct();
  }
  onGetProduct(){
    this.http.getProduct(this.productId).subscribe((response)=>{
      console.log(response);
      this.product=response;
      // below code for first load 
      this.showBigImage=this.product?.images[0]?.url;
      this.bigImageId=this.product?.images[0]?.public_id;
    },err=>{
      console.log(err.error.message);
    },()=>{
      this.viewStatus=true;
    })
  }
  onShowBigImage(image:any){
    this.showBigImage=image.url;
    this.bigImageId=image.public_id;
  }
  onDeleteImage(){
    this.http.updateImage({delete:this.bigImageId},this.productId).subscribe((response:any)=>{
      console.log(response);
    },err=>{
      console.log(err.error.message);
    },()=>{
      this.userService.showSuccess('Image Deleted Successfully');
      this.onGetProduct();
    });
  }
  onAddImage(){
    const formData = new FormData();
    for(let image of this.images){
      formData.append("images",image);
    }
    this.http.updateImage(formData,this.productId).subscribe((response:any)=>{
      console.log(response);
    },err=>{
      console.log(err.error.message);
    },()=>{
      this.userService.showSuccess('Image Added Successfully');
      this.onGetProduct();
    });
  }
  onFile(files:any){
    let images=files.target.files;
    console.log(files.target.files);
    for(let image of images){
      this.images.push(image);
    }
  }
}
