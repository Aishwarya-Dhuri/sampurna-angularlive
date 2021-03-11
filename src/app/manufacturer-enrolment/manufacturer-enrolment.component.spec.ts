  import { async, ComponentFixture, TestBed } from '@angular/core/testing';

  import { ManufacturerEnrolmentComponent } from './manufacturer-enrolment.component';

  describe('ManufacturerEnrolmentComponent', () => {
    let component: ManufacturerEnrolmentComponent;
    let fixture: ComponentFixture<ManufacturerEnrolmentComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ManufacturerEnrolmentComponent ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ManufacturerEnrolmentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
