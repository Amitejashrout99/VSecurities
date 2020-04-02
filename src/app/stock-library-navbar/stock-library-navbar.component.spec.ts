import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLibraryNavbarComponent } from './stock-library-navbar.component';

describe('StockLibraryNavbarComponent', () => {
  let component: StockLibraryNavbarComponent;
  let fixture: ComponentFixture<StockLibraryNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockLibraryNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLibraryNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
