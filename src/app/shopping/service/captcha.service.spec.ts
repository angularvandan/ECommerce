import { TestBed } from '@angular/core/testing';

import { CaptchaService } from './captcha.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

describe('CaptchaService', () => {
  let service: CaptchaService;
  let reCaptchaV3Service: ReCaptchaV3Service;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[CaptchaService,ReCaptchaV3Service]
    });
    service = TestBed.inject(CaptchaService);
    reCaptchaV3Service = TestBed.inject(ReCaptchaV3Service);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });

});
