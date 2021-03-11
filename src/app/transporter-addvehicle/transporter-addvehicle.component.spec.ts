import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterAddvehicleComponent } from './transporter-addvehicle.component';

describe('TransporterAddvehicleComponent', () => {
  let component: TransporterAddvehicleComponent;
  let fixture: ComponentFixture<TransporterAddvehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterAddvehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterAddvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
