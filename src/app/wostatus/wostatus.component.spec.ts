import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WostatusComponent } from './wostatus.component';

describe('WostatusComponent', () => {
  let component: WostatusComponent;
  let fixture: ComponentFixture<WostatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WostatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WostatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
