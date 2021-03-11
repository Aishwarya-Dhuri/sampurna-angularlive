import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesDetailsComponent } from './view-sales-details.component';

describe('ViewSalesDetailsComponent', () => {
  let component: ViewSalesDetailsComponent;
  let fixture: ComponentFixture<ViewSalesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSalesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSalesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
