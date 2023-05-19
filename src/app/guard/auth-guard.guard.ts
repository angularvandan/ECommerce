import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../service/http.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private httpService: HttpService,private userService:UserService) { }
  //never miss behave with canActivate
  //because it calls many time after first call
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token: any;
    try {
      token = JSON.parse(<string>localStorage.getItem('token1'));
    } catch (err) {
      localStorage.removeItem('token1');
    }
    let login:any;
    if (token != null) {
      this.httpService.fetchUserDetails().subscribe((response: any) => {
        console.log('guard');
        login=true;
        this.userService.nav.next(false);
      }, (err) => {
        this.router.navigate(['auth/login']);
        login=false;
        this.userService.nav.next(true);
      })
      return login;
    }
    else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
