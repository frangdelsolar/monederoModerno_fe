import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountInstructionsComponent } from './bank-account-instructions.component';

describe('BankAccountInstructionsComponent', () => {
  let component: BankAccountInstructionsComponent;
  let fixture: ComponentFixture<BankAccountInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
