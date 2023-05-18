import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{

  reactiveForm!:FormGroup;
  images!:File;


  constructor(private http:HttpService,private userService:UserService,private router:Router){}

  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,Validators.required),
      description:new FormControl(null,Validators.required),
      images:new FormControl(null,Validators.required),
      price:new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*[0-9]$')]),
    })
  }
  onCreateProduct(){
    console.log(this.reactiveForm);
    const formData = new FormData();
    formData.append("name",this.reactiveForm.get('name')?.value);
    formData.append("description",this.reactiveForm.get('description')?.value);
    formData.append("images",this.images);
    formData.append("price",this.reactiveForm.get('price')?.value);
      
    this.http.createProducts(formData).subscribe((res:any)=>{
      console.log(res);
    },err=>{
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Created Successfully');
      this.router.navigate(['products/product-list']);
    });
  }
  onFile(files:any){
    this.images=(files.target.files[0]);
  }
}
