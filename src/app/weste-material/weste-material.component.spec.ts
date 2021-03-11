import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WesteMaterialComponent } from './weste-material.component';

describe('WesteMaterialComponent', () => {
  let component: WesteMaterialComponent;
  let fixture: ComponentFixture<WesteMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WesteMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WesteMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
