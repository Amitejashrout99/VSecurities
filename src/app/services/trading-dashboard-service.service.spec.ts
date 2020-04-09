import { TestBed } from '@angular/core/testing';

import { TradingDashboardServiceService } from './trading-dashboard-service.service';

describe('TradingDashboardServiceService', () => {
  let service: TradingDashboardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingDashboardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
