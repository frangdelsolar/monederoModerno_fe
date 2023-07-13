import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentSectionComponent } from './installment-section.component';

describe('InstallmentSectionComponent', () => {
  let component: InstallmentSectionComponent;
  let fixture: ComponentFixture<InstallmentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallmentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
