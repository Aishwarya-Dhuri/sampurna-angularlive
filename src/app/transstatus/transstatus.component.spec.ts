import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransstatusComponent } from './transstatus.component';

describe('TransstatusComponent', () => {
  let component: TransstatusComponent;
  let fixture: ComponentFixture<TransstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
