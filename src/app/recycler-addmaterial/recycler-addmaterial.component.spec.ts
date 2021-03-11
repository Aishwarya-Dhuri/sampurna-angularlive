import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclerAddmaterialComponent } from './recycler-addmaterial.component';

describe('RecyclerAddmaterialComponent', () => {
  let component: RecyclerAddmaterialComponent;
  let fixture: ComponentFixture<RecyclerAddmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecyclerAddmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecyclerAddmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
