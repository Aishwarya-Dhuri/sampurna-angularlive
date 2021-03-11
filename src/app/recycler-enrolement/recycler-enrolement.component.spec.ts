import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclerEnrolementComponent } from './recycler-enrolement.component';

describe('RecyclerEnrolementComponent', () => {
  let component: RecyclerEnrolementComponent;
  let fixture: ComponentFixture<RecyclerEnrolementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecyclerEnrolementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclerEnrolementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
