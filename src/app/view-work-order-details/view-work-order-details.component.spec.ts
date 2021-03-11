import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkOrderDetailsComponent } from './view-work-order-details.component';

describe('ViewWorkOrderDetailsComponent', () => {
  let component: ViewWorkOrderDetailsComponent;
  let fixture: ComponentFixture<ViewWorkOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWorkOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
