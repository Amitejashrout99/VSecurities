import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockWatchBannerComponent } from './stock-watch-banner.component';

describe('StockWatchBannerComponent', () => {
  let component: StockWatchBannerComponent;
  let fixture: ComponentFixture<StockWatchBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockWatchBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockWatchBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
