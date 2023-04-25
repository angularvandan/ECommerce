import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
specificUser!:{}[]|undefined;

  constructor() { 
    // console.log(this.specificUser);
    // let data=JSON.parse(localStorage.getItem('RegisterData')||'[]');
    // for(let userData of data){
    //   if(userData.isLogin===true){
    //     this.specificUser=userData;
    //   }
    // }

    
  }
}
