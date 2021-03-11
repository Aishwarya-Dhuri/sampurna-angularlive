import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicaleTypeComponent } from './vehicale-type.component';

describe('VehicaleTypeComponent', () => {
  let component: VehicaleTypeComponent;
  let fixture: ComponentFixture<VehicaleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicaleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicaleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
