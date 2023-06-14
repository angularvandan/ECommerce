import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { HttpService } from '../../service/http.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [HttpService],
      imports: [HttpClientTestingModule]

    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let service: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // it('should make a GET request to the correct URL', () => {
  //   const expectedData = {
  //     "user": {
  //       "_id": "6447662e49ce72c17a340cf0",
  //       "name": "Vandan", "_org": { "_id": "6447662e49ce72c17a340ced", "name": "AngularMinds.in", "email": "vandan@angularminds.in" }, "email": "vandan@angularminds.in", "role": "admin", "isEmailVerified": true, "deleted": false, "createdAt": "2023-04-25T05:33:34.881Z", "updatedAt": "2023-06-03T11:28:38.135Z"
  //     }, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDQ3NjYyZTQ5Y2U3MmMxN2EzNDBjZjAiLCJpYXQiOjE2ODY2Mzg4MDEsImV4cCI6MTY4NjcyNTIwMSwidHlwZSI6ImFjY2VzcyJ9.Dh8b98egCHwmCkrnrdDiuJ5j8te6PhUmFuNk73Gedys", "expires": "2023-06-14T06:46:41.361Z"
  //   };
  //   const payload = { email: 'dsd@gmail.com', password: 'ddss232' }

  //   service.login(payload).subscribe(data => {
  //     expect(data).toEqual(expectedData);
  //   });

  //   const req = httpTestingController.expectOne('https://shop-api.ngminds.com/shop/auth/login');
  //   expect(req.request.method).toEqual('POST');

  //   req.flush(expectedData);

  //   httpTestingController.verify();
  // });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
