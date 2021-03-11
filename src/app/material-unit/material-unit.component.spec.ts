import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialUnitComponent } from './material-unit.component';

describe('MaterialUnitComponent', () => {
  let component: MaterialUnitComponent;
  let fixture: ComponentFixture<MaterialUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
