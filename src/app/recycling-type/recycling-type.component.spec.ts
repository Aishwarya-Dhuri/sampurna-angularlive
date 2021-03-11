import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclingTypeComponent } from './recycling-type.component';

describe('RecyclingTypeComponent', () => {
  let component: RecyclingTypeComponent;
  let fixture: ComponentFixture<RecyclingTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecyclingTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
