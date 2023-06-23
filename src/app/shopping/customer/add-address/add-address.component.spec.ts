import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddressComponent } from './add-address.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
import { CaptchaService } from '../../service/captcha.service';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import environment from 'src/environment/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('AddAddressComponent', () => {

  let component: AddAddressComponent;
  let fixture: ComponentFixture<AddAddressComponent>;
  let httpService:HttpService;
  let httpClient:HttpClient;
  let httpMock:HttpTestingController;
  let captchaService:CaptchaService;
  let userService:UserService;
  let socialAuthService:SocialAuthService;
  let router:Router;

  let myRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAddressComponent ],
      providers:[AddAddressComponent,HttpService,UserService,CaptchaService
        ,ReCaptchaV3Service,SocialAuthService,
        { provide: Router, useValue: myRouter },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.reCaptchaKey },
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  environment.clientId
                )
              },
            ],
            onError: (err) => {
              console.error(err);
            }
          } as SocialAuthServiceConfig,
        }],
        imports:[ToastrModule.forRoot(),HttpClientTestingModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule]
      })
    .compileComponents();
  });

  beforeEach(async ()=>{
    httpService=TestBed.inject(HttpService);
    httpClient=TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    captchaService = TestBed.inject(CaptchaService);
    socialAuthService = TestBed.inject(SocialAuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component=TestBed.inject(AddAddressComponent);


    fixture = TestBed.createComponent(AddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add address',()=>{
    let payLoad={
      street:'sdfsfd',
      addressLine2:'sdfsdf',
      state:'sdfsfdsd',
      city:'sdfsdf',
      pin:'23423'
    }
    spyOn(httpService,'addAddress').and.returnValues(of(payLoad));
    component.onAddAddress();
    expect(httpService.addAddress).toHaveBeenCalled();
  });
  it('should add address fail',()=>{
    let payLoad={
      street:'sdfsfd',
      addressLine2:'sdfsdf',
      state:'sdfsfdsd',
      city:'sdfsdf',
      pin:'23423'
    }
    spyOn(httpService,'addAddress').and.returnValues(throwError({error:{message:'address not valid'}}));
    component.onAddAddress();
    expect(httpService.addAddress).toHaveBeenCalled();
  });

});
