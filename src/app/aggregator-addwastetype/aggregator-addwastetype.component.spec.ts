import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorAddwastetypeComponent } from './aggregator-addwastetype.component';

describe('AggregatorAddwastetypeComponent', () => {
  let component: AggregatorAddwastetypeComponent;
  let fixture: ComponentFixture<AggregatorAddwastetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregatorAddwastetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorAddwastetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
