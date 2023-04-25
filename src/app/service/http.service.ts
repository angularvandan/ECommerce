import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../auth/Model/register';
import { computeStyles } from '@popperjs/core';
import { Login } from '../auth/Model/login';
import { Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  error=new Subject<string>();

  constructor(private http:HttpClient) { }

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
    let token=JSON.parse(localStorage.getItem('token1')||'');
    let headers=new HttpHeaders().set('Authorization',`bearer ${token}`)
    return this.http.get('https://shop-api.ngminds.com/auth/self',{headers:headers});
  }
  updateUserDetails(){

  }
  deleteUserDetails(){

  }
  deleteAllUser(){

  }


}
