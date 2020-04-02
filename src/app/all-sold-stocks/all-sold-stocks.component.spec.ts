import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSoldStocksComponent } from './all-sold-stocks.component';

describe('AllSoldStocksComponent', () => {
  let component: AllSoldStocksComponent;
  let fixture: ComponentFixture<AllSoldStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSoldStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSoldStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
