import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellBoughtStocksComponent } from './sell-bought-stocks.component';

describe('SellBoughtStocksComponent', () => {
  let component: SellBoughtStocksComponent;
  let fixture: ComponentFixture<SellBoughtStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellBoughtStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBoughtStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
