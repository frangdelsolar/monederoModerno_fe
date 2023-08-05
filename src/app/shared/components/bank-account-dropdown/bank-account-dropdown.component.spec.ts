import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountDropdownComponent } from './bank-account-dropdown.component';

describe('BankAccountDropdownComponent', () => {
  let component: BankAccountDropdownComponent;
  let fixture: ComponentFixture<BankAccountDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
