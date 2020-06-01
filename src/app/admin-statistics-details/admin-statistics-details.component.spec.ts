import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticsDetailsComponent } from './admin-statistics-details.component';

describe('AdminStatisticsDetailsComponent', () => {
  let component: AdminStatisticsDetailsComponent;
  let fixture: ComponentFixture<AdminStatisticsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
