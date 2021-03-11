import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorEnrolmentComponent } from './aggregator-enrolment.component';

describe('AggregatorEnrolmentComponent', () => {
  let component: AggregatorEnrolmentComponent;
  let fixture: ComponentFixture<AggregatorEnrolmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregatorEnrolmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
