import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterEnrolmentComponent } from './transporter-enrolment.component';

describe('TransporterEnrolmentComponent', () => {
  let component: TransporterEnrolmentComponent;
  let fixture: ComponentFixture<TransporterEnrolmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterEnrolmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
