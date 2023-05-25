import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self',
  templateUrl: './self.component.html',
  styleUrls: ['./self.component.css']
})
export class SelfComponent implements OnInit{
  user:any;
  image:any;
  reactiveForm!:FormGroup;
  editProfileStatus:boolean=true;

  constructor(private httpService:HttpService,private userService:UserService,
    private router:Router){
    this.userService.loginRegisterStatus.next(true);
  }
  ngOnInit(): void {
    this.getSelf();
    this.reactiveForm=new FormGroup({
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
    });
    this.reactiveForm.disable();
    //for hide th recaptcha
    var ele: any = document.querySelector('.grecaptcha-badge');
      // console.log(ele);
      if(ele!=null){
        ele.style.display = 'none';
      }
  }
  getSelf(){
    this.httpService.self().subscribe((response:any)=>{
      console.log(response);
      this.user=response;
    },err=>{
      // console.log(err);
    },()=>{
      this.userService.loginRegisterStatus.next(true);
    });
  }
  onUpdateImage(){
    const formData=new FormData();
    formData.append('picture',this.image);

    this.httpService.updateProfilePicture(formData).subscribe((response:any)=>{
      console.log(response);

    },err=>{
      // console.log(err.error.message);
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Successfully updated');
      this.getSelf();
    });
  }
  onDeleteImage(){
    let confirm=window.confirm('Do you want to delete image ?');
    if(confirm){
      this.httpService.deleteProfilePicture().subscribe((response:any)=>{
        console.log(response);
      },err=>{
        // console.log(err.error.message);
        this.userService.showWarning(err.error.message);

      },()=>{
        this.userService.showSuccess('Successfully deleted');
        this.getSelf();
      });
    }
  }
  onFile(image:any){
    // console.log(image.target.files[0]);
    this.image=image.target.files[0];
  }
  onEditProfile(){
    this.reactiveForm.enable();
    this.editProfileStatus=false;
    document.getElementById('name')?.focus();
    this.reactiveForm.patchValue({
      name:this.user?.name,
      email:this.user?.email
    });
  }
  onCancel(){
    this.reactiveForm.disable();
    this.editProfileStatus=true;
  }
  onEditProfileSave(){
    console.log(this.reactiveForm.value);
    this.httpService.updateProfile(this.reactiveForm.value).subscribe((response:any)=>{
      console.log(response);
    },err=>{
      // console.log(err);
      this.userService.showWarning(err.error.message);
    },()=>{
      this.userService.showSuccess('Successfully Updated');
      this.reactiveForm.disable();
      this.editProfileStatus=true;
    });
  }
  onAddAddress(){
    this.router.navigate(['shop/customer/add-address']);
  }
  onGetAddress(){
    this.router.navigate(['shop/customer/get-address']);
  }
}
