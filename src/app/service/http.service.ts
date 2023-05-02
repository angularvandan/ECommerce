import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../auth/Model/register';
import { Login } from '../auth/Model/login';
import { Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  error=new Subject<string>();
  token!:any;
  headers!:any;
  constructor(private http:HttpClient) {
    this.token=JSON.parse(<string>localStorage.getItem('token1'));
    this.headers=new HttpHeaders().set('Authorization',`bearer ${this.token}`)
  }
  createRegister(register:Register){
    return this.http.post('https://shop-api.ngminds.com/auth/register?captcha=false',register);
  }
  createLogin(login:Login){
    return this.http.post('https://shop-api.ngminds.com/auth/login?captcha=false',login)
    .pipe(catchError((err)=>{
      return throwError(err);
    }));
  }
  fetchUserDetails(){
    return this.http.get('https://shop-api.ngminds.com/auth/self',{headers:this.headers});
  }
  updateUserCompanyDetails(user:{email:string,name:string}){
    return this.http.patch('https://shop-api.ngminds.com/users/org',user,{headers:this.headers})
    .pipe(catchError((err)=>{
      return throwError(err);
    }));
  }
  createUser(user:{email:string,password:string,name:string,role:string}){
    return this.http.post('https://shop-api.ngminds.com/users ',user,{headers:this.headers})
    .pipe(catchError((err)=>{
      return throwError(err);
    }));
  }
  getUsers(user:{}){
    return this.http.get('https://shop-api.ngminds.com/users',{headers:this.headers,params:user});
  }
  deleteUser(userId:string){
    return this.http.delete('https://shop-api.ngminds.com/users/'+userId,{headers:this.headers});
  }
  updateUserDetails(userId:string,user:{email:string,password:string,name:string}){
    return this.http.patch('https://shop-api.ngminds.com/users/'+userId,user,{headers:this.headers})
    .pipe(catchError((err)=>{
      return throwError(err);
    }));
  }
  updateUserRole(userId:string,user:{role:string}){
    return this.http.patch('https://shop-api.ngminds.com/users/role/'+userId,user,{headers:this.headers})
    .pipe(catchError((err)=>{
      return throwError(err);
    }));
  }
}
