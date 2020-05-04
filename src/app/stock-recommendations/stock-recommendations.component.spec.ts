import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRecommendationsComponent } from './stock-recommendations.component';

describe('StockRecommendationsComponent', () => {
  let component: StockRecommendationsComponent;
  let fixture: ComponentFixture<StockRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
