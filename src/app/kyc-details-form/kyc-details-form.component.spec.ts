import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDetailsFormComponent } from './kyc-details-form.component';

describe('KycDetailsFormComponent', () => {
  let component: KycDetailsFormComponent;
  let fixture: ComponentFixture<KycDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
