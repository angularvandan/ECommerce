import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token:any;
  headers: any;
  constructor(private http:HttpClient) {
    // console.log('hi');
    try{
      this.token=JSON.parse(<string>localStorage.getItem('CustomerToken'));
      this.headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`)
    }catch(err){
      localStorage.removeItem('CustomerToken');
    }
   }

  getAllProducts(product:{}){
    return this.http.get('https://shop-api.ngminds.com/shop/products',{params:product});
  }
  getProduct(id:any){
    return this.http.get('https://shop-api.ngminds.com/shop/products/'+id);
  }
  register(user:{}){
    return this.http.post('https://shop-api.ngminds.com/shop/auth/register',user)
  }
  login(user:{}){
    return this.http.post('https://shop-api.ngminds.com/shop/auth/login',user)
  }
  self(){
    try{
      this.token=JSON.parse(<string>localStorage.getItem('CustomerToken'));
      this.headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`)
    }catch(err){
      localStorage.removeItem('CustomerToken');
    }
    return this.http.get('https://shop-api.ngminds.com/shop/auth/self',{headers:this.headers})
  }
  updateProfile(user:{}){
    return this.http.patch('https://shop-api.ngminds.com/customers/update-profile',user,{headers:this.headers})
  }
  updateProfilePicture(image:any){
    return this.http.post('https://shop-api.ngminds.com/customers/profile-picture',image,{headers:this.headers});
  }
  deleteProfilePicture(){
    return this.http.delete('https://shop-api.ngminds.com/customers/profile-picture',{headers:this.headers})
  }
  changePassword(password:{}){
    return this.http.post('https://shop-api.ngminds.com/customers/auth/change-password',password,{headers:this.headers})
  }
  removeAccount(){
    return this.http.delete('https://shop-api.ngminds.com/customers/account',{headers:this.headers})
  }
}
