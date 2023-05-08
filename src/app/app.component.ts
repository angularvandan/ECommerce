import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECommerce';
  constructor(private route:Router){
    // let token=JSON.parse(<string>localStorage.getItem('token1'));
    // if(token!=null){
    //   this.route.navigate(['my-profile']);
    // }
  }
}
