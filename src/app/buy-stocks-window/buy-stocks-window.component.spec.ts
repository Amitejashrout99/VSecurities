import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStocksWindowComponent } from './buy-stocks-window.component';

describe('BuyStocksWindowComponent', () => {
  let component: BuyStocksWindowComponent;
  let fixture: ComponentFixture<BuyStocksWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStocksWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyStocksWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
