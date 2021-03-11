import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingTypeComponent } from './processing-type.component';

describe('ProcessingTypeComponent', () => {
  let component: ProcessingTypeComponent;
  let fixture: ComponentFixture<ProcessingTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
