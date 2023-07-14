import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousPaymentsComponent } from './previous-payments.component';

describe('PreviousPaymentsComponent', () => {
  let component: PreviousPaymentsComponent;
  let fixture: ComponentFixture<PreviousPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
