import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountWidgetComponent } from './bank-account-widget.component';

describe('BankAccountWidgetComponent', () => {
  let component: BankAccountWidgetComponent;
  let fixture: ComponentFixture<BankAccountWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
