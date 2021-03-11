import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclerstatusComponent } from './recyclerstatus.component';

describe('RecyclerstatusComponent', () => {
  let component: RecyclerstatusComponent;
  let fixture: ComponentFixture<RecyclerstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecyclerstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclerstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
