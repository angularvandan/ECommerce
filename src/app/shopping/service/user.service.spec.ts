import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';


describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[UserService],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
