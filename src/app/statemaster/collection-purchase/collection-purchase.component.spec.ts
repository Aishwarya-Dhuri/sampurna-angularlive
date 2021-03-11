import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPurchaseComponent } from './collection-purchase.component';

describe('CollectionPurchaseComponent', () => {
  let component: CollectionPurchaseComponent;
  let fixture: ComponentFixture<CollectionPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
