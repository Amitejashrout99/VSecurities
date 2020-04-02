import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBoughtStocksComponent } from './all-bought-stocks.component';

describe('AllBoughtStocksComponent', () => {
  let component: AllBoughtStocksComponent;
  let fixture: ComponentFixture<AllBoughtStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBoughtStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBoughtStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
