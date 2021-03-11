import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubrubsComponent } from './subrubs.component';

describe('SubrubsComponent', () => {
  let component: SubrubsComponent;
  let fixture: ComponentFixture<SubrubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubrubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubrubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
