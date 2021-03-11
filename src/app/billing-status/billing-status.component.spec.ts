import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingStatusComponent } from './billing-status.component';

describe('BillingStatusComponent', () => {
  let component: BillingStatusComponent;
  let fixture: ComponentFixture<BillingStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
