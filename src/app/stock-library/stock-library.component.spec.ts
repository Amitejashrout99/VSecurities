import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLibraryComponent } from './stock-library.component';

describe('StockLibraryComponent', () => {
  let component: StockLibraryComponent;
  let fixture: ComponentFixture<StockLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
