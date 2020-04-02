import { TestBed } from '@angular/core/testing';

import { ProcessHTTPerrorService } from './process-httperror.service';

describe('ProcessHTTPerrorService', () => {
  let service: ProcessHTTPerrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessHTTPerrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
