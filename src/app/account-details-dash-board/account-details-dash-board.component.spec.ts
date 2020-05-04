import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsDashBoardComponent } from './account-details-dash-board.component';

describe('AccountDetailsDashBoardComponent', () => {
  let component: AccountDetailsDashBoardComponent;
  let fixture: ComponentFixture<AccountDetailsDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
