import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumDashboardComponent } from './forum-dashboard.component';

describe('ForumDashboardComponent', () => {
  let component: ForumDashboardComponent;
  let fixture: ComponentFixture<ForumDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
