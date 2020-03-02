import { TestBed } from '@angular/core/testing';

import { AlienServiceService } from './alien-service.service';

describe('AlienServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlienServiceService = TestBed.get(AlienServiceService);
    expect(service).toBeTruthy();
  });
});
