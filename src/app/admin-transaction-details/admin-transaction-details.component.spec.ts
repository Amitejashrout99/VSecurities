import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransactionDetailsComponent } from './admin-transaction-details.component';

describe('AdminTransactionDetailsComponent', () => {
  let component: AdminTransactionDetailsComponent;
  let fixture: ComponentFixture<AdminTransactionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTransactionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
