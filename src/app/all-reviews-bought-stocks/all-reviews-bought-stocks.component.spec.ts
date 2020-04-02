import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReviewsBoughtStocksComponent } from './all-reviews-bought-stocks.component';

describe('AllReviewsBoughtStocksComponent', () => {
  let component: AllReviewsBoughtStocksComponent;
  let fixture: ComponentFixture<AllReviewsBoughtStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllReviewsBoughtStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReviewsBoughtStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
