import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockResearchDetailsComponent } from './stock-research-details.component';

describe('StockResearchDetailsComponent', () => {
  let component: StockResearchDetailsComponent;
  let fixture: ComponentFixture<StockResearchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockResearchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockResearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
