import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router:Router){}
  //never miss behave with canActivate
  //because it calls many time after first call
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let arrUser = JSON.parse(localStorage.getItem('RegisterData') || '[]');
      // let loginStatus=false;
      // for(let user of arrUser){
      //   if(user.isLogin){
      //     console.log('From True Called')
      //     loginStatus=true;
      //     return loginStatus;
      //   }
      // }
      // console.log('Guard Called');
      // if(!loginStatus){
      //   this.router.navigate(['auth/login']);
      //   //This is the biggest problem 
      //   //this.router.navigate(['auth/login']);
      // }
      
      let token= localStorage.getItem('token1');
      if(token!=null){
        return true;
      }
      else{
        this.router.navigate(['auth/login']);
        return false;
      }
     
  }
  
}
