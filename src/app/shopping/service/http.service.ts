import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token:any;
  headers: any;
  constructor(private http:HttpClient) {
   }

  getAllProducts(product:{}){
    return this.http.get('https://shop-api.ngminds.com/shop/products',{params:product});
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
      localStorage.removeItem('token1');
    }
    return this.http.get('https://shop-api.ngminds.com/shop/auth/self',{headers:this.headers})
  }
}
