import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLibraryBannerComponent } from './stock-library-banner.component';

describe('StockLibraryBannerComponent', () => {
  let component: StockLibraryBannerComponent;
  let fixture: ComponentFixture<StockLibraryBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockLibraryBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLibraryBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
