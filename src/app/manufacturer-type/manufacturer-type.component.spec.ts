import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerTypeComponent } from './manufacturer-type.component';

describe('ManufacturerTypeComponent', () => {
  let component: ManufacturerTypeComponent;
  let fixture: ComponentFixture<ManufacturerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
