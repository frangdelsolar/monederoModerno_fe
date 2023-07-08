import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionTypeDropdownComponent } from './deduction-type-dropdown.component';

describe('DeductionTypeDropdownComponent', () => {
  let component: DeductionTypeDropdownComponent;
  let fixture: ComponentFixture<DeductionTypeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionTypeDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionTypeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
