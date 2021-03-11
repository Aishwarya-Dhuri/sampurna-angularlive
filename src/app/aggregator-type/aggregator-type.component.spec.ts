import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorTypeComponent } from './aggregator-type.component';

describe('AggregatorTypeComponent', () => {
  let component: AggregatorTypeComponent;
  let fixture: ComponentFixture<AggregatorTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregatorTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
