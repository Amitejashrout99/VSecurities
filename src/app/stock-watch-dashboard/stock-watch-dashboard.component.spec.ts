import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockWatchDashboardComponent } from './stock-watch-dashboard.component';

describe('StockWatchDashboardComponent', () => {
  let component: StockWatchDashboardComponent;
  let fixture: ComponentFixture<StockWatchDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockWatchDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockWatchDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
