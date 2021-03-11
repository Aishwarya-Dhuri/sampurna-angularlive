import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmanufacturerWastetypeComponent } from './addmanufacturer-wastetype.component';

describe('AddmanufacturerWastetypeComponent', () => {
  let component: AddmanufacturerWastetypeComponent;
  let fixture: ComponentFixture<AddmanufacturerWastetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmanufacturerWastetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmanufacturerWastetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
