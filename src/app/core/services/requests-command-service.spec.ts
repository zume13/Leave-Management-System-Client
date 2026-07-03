import { TestBed } from '@angular/core/testing';

import { RequestsCommandService } from './requests-command-service';

describe('RequestsCommandService', () => {
  let service: RequestsCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
