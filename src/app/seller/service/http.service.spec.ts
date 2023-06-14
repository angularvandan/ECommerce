import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';


fdescribe('HttpService', () => {
  let service: HttpService;
  let httpMock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[HttpService]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  const dummyCreateRegister={
    "user": {
        "name": "chandan",
        "_org": {
            "_id": "64894e898314b2229dea6735",
            "name": "angular",
            "email": "chandanf@gmail.com"
        },
        "email": "chandanf@gmail.com",
        "role": "admin",
        "isEmailVerified": false,
        "_id": "64894e898314b2229dea6738",
        "deleted": false,
        "createdAt": "2023-06-14T05:22:17.915Z",
        "updatedAt": "2023-06-14T05:22:17.915Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDg5NGU4OTgzMTRiMjIyOWRlYTY3MzgiLCJpYXQiOjE2ODY3MjAxMzcsImV4cCI6MTY4NjgwNjUzNywidHlwZSI6ImFjY2VzcyJ9.pwDlmAsewhjFa9V9eHsDe1CKNiYsG2erNXBXm5hzWCo",
    "expires": "2023-06-15T05:22:17.943Z"
  }
  it('should create register',()=>{
    const payload={
      email:'vandna@gmail.com',
      password:'sfjsld234',
      name:'vandan',
      company:'angularminds.in',
      captcha:'2r2343'
    }
    service.createRegister(payload).subscribe(res=>{
      expect(res).toEqual(dummyCreateRegister);
    });
    const req=httpMock.expectOne(res=>res.method==='POST' );
    expect(req.request.method).toEqual('POST');
    req.flush(dummyCreateRegister);
  });

  const dummyCreateLogin={
    "user": {
        "_id": "6447662e49ce72c17a340cf0",
        "name": "Vandan",
        "_org": {
            "_id": "6447662e49ce72c17a340ced",
            "name": "AngularMinds.in",
            "email": "vandan@angularminds.in"
        },
        "email": "vandan@angularminds.in",
        "role": "admin",
        "isEmailVerified": true,
        "deleted": false,
        "createdAt": "2023-04-25T05:33:34.881Z",
        "updatedAt": "2023-06-03T11:28:38.135Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDQ3NjYyZTQ5Y2U3MmMxN2EzNDBjZjAiLCJpYXQiOjE2ODY3MjA0MzEsImV4cCI6MTY4NjgwNjgzMSwidHlwZSI6ImFjY2VzcyJ9.O1VOysaP9X7gCw8Kb5yt5TaFlDfY-w_eCWshxmR91MI",
    "expires": "2023-06-15T05:27:11.814Z"
}
  it('should create login',()=>{
    const payload={
      email:'vandan@.com',
      password:'sdfsdfs',
      captcha:'sdfsdf'
    }
    service.createLogin(payload).subscribe(res=>{
      expect(res).toEqual(dummyCreateLogin);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyCreateLogin);
  })

  const dummyFetchUserDetails={
    "_id": "6447662e49ce72c17a340cf0",
    "name": "Vandan",
    "_org": {
        "_id": "6447662e49ce72c17a340ced",
        "name": "AngularMinds.in",
        "email": "vandan@angularminds.in"
    },
    "email": "vandan@angularminds.in",
    "role": "admin",
    "isEmailVerified": true,
    "deleted": false,
    "createdAt": "2023-04-25T05:33:34.881Z",
    "updatedAt": "2023-06-03T11:28:38.135Z"
  }
  it('should fetch user details',()=>{
    
    service.fetchUserDetails().subscribe(res=>{
      expect(res).toEqual(dummyFetchUserDetails);
    });
    const req=httpMock.expectOne(res=>res.method==='GET');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyFetchUserDetails);
  })

  const dummyUpdateUserCompanyDetails={
    "_id": "6447662e49ce72c17a340ced",
    "name": "AngularMinds",
    "email": "vandan@angularminds.in",
    "deleted": false,
    "createdAt": "2023-04-25T05:33:34.877Z",
    "updatedAt": "2023-06-14T05:36:10.971Z"
  }
  it('should update company details',()=>{
    
    service.updateUserCompanyDetails({name:'dsdfsd'}).subscribe(res=>{
      expect(res).toEqual(dummyUpdateUserCompanyDetails);
    });
    const req=httpMock.expectOne(res=>res.method==='PATCH');
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyUpdateUserCompanyDetails);
  })
  const dummyCreateUser={
    "name": "rahul",
    "_org": {
        "_id": "6447662e49ce72c17a340ced",
        "name": "AngularMinds",
        "email": "vandan@angularminds.in"
    },
    "email": "rahul122@gmail.com",
    "role": "user",
    "isEmailVerified": false,
    "_id": "648954cb8314b2229dea6a21",
    "deleted": false,
    "createdAt": "2023-06-14T05:48:59.078Z",
    "updatedAt": "2023-06-14T05:48:59.078Z"
  }
  it('should create user',()=>{
    const payload={
      name:'vandan',
      password:'sdfss',
      email:'vandna@gmail.com',
      role:'admin'
    }
    service.createUser(payload).subscribe(res=>{
      expect(res).toEqual(dummyCreateUser);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyCreateUser);
  })
  const dummyGetUsers={
    "results": [
        {
            "_id": "6447662e49ce72c17a340cf0",
            "name": "Vandan",
            "_org": {
                "_id": "6447662e49ce72c17a340ced",
                "name": "AngularMinds",
                "email": "vandan@angularminds.in"
            },
            "email": "vandan@angularminds.in",
            "role": "admin",
            "isEmailVerified": true,
            "deleted": false,
            "createdAt": "2023-04-25T05:33:34.881Z",
            "updatedAt": "2023-06-03T11:28:38.135Z"
        },
    ],
    "page": 1,
    "limit": 3,
    "totalPages": 8,
    "totalResults": 24
  }
  it('should getUsers',()=>{
    service.getUsers({limit:1}).subscribe(res=>{
      expect(res).toEqual(dummyGetUsers);
    });
    const req=httpMock.expectOne(res=>res.method==='GET');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyGetUsers);
  })
  const dummyDeleteUser={
  }
  it('should delete user',()=>{
    service.deleteUser('sdsdffdgd').subscribe(res=>{
      expect(res).toEqual(dummyDeleteUser);
    });
    const req=httpMock.expectOne(res=>res.method==='DELETE');
    expect(req.request.method).toEqual('DELETE');
    req.flush(dummyDeleteUser);
  })
  const dummyUpdateUserDetails={
    "_id": "644b861549ce72c17a3523b6",
    "name": "sunny",
    "_org": {
        "_id": "6447662e49ce72c17a340ced",
        "name": "AngularMinds",
        "email": "vandan@angularminds.in"
    },
    "email": "sunny1@gmail.com",
    "role": "user",
    "isEmailVerified": false,
    "deleted": false,
    "createdAt": "2023-04-28T08:38:45.045Z",
    "updatedAt": "2023-06-14T06:07:53.059Z"
  }
  it('should update user details',()=>{
    const payload={
      email:'vandna@gmail.com',
      password:'dsddfsf',
      name:'vandna'
    }
    service.updateUserDetails('sdsdffdgd',payload).subscribe(res=>{
      expect(res).toEqual(dummyUpdateUserDetails);
    });
    const req=httpMock.expectOne(res=>res.method==='PATCH');
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyUpdateUserDetails);
  })
  const dummyUpdateUserRole={
    "_id": "644a25f449ce72c17a347d5b",
    "name": "Aniket fadale",
    "_org": "6447662e49ce72c17a340ced",
    "email": "aniketfadale51@gmail.com",
    "role": "admin",
    "isEmailVerified": false,
    "deleted": false,
    "createdAt": "2023-04-27T07:36:20.479Z",
    "updatedAt": "2023-06-14T06:11:10.932Z"
  }
  it('should update user role',()=>{
    service.updateUserRole('sdsdffdgd',{role:'user'}).subscribe(res=>{
      expect(res).toEqual(dummyUpdateUserRole);
    });
    const req=httpMock.expectOne(res=>res.method==='PATCH');
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyUpdateUserRole);
  })
  const dummyChangePassword={
  }
  it('should change password',()=>{
    service.changePassword({old_password:'dsdsd',new_password:'sdsds'}).subscribe(res=>{
      expect(res).toEqual(dummyChangePassword);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyChangePassword);
  })
  const dummyResetPassword={
  }
  it('should reset password',()=>{
    service.resetPassword('dsdfsfl','sdfsds').subscribe(res=>{
      expect(res).toEqual(dummyResetPassword);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyResetPassword);
  })




});


