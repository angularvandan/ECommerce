import { Directive, ElementRef, Renderer2, OnInit, AfterViewInit, AfterContentInit, Input } from '@angular/core';
import { count } from 'rxjs';


@Directive({
  selector: '[appDiscount]'
})
export class DiscountDirective implements AfterViewInit{


  @Input('abc') abc:any;
  constructor(private element:ElementRef,private renderer:Renderer2) {
  }
  ngAfterViewInit(): void {
    // console.log(this.element.nativeElement.localName);
    this.element.nativeElement.style.color='green';
    this.calculateTime();
  }
  calculateTime(){
    let endTime=new Date(this.abc);
    setInterval(()=>{
      let currentTime=new Date();
      let remainingMili=endTime.getTime()-currentTime.getTime();
      
      let obj={
        hours:Math.floor(remainingMili/(1000*60*60)),
        minutes:Math.floor((remainingMili/(1000*60))%60),
        seconds:Math.floor((remainingMili/1000)%60),
      }
      if(this.element.nativeElement.localName=='span'){
        this.element.nativeElement.style.color="red";
        let countDay=0;
        if(obj.hours>=24){
          for(let i=24;i<=obj.hours;i+=24){
            countDay++;
          }
          this.element.nativeElement.innerText=`(${countDay} Day :${obj.hours%24} H :${obj.minutes} M: ${obj.seconds} S)`
        }else{
          this.element.nativeElement.innerText=`(${obj.hours} H :${obj.minutes} M: ${obj.seconds} S)`
        }
      }
    },1000)
  }
}
