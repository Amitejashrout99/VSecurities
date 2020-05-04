import { TestBed } from '@angular/core/testing';

import { StockWatchServiceService } from './stock-watch-service.service';

describe('StockWatchServiceService', () => {
  let service: StockWatchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockWatchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
