import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementstatusComponent } from './aggrementstatus.component';

describe('AggrementstatusComponent', () => {
  let component: AggrementstatusComponent;
  let fixture: ComponentFixture<AggrementstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggrementstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrementstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
