import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistedStocksComponent } from './watchlisted-stocks.component';

describe('WatchlistedStocksComponent', () => {
  let component: WatchlistedStocksComponent;
  let fixture: ComponentFixture<WatchlistedStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistedStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistedStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
