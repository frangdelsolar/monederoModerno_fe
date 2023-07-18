import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionWrapperComponent } from './transaction-wrapper.component';

describe('TransactionWrapperComponent', () => {
  let component: TransactionWrapperComponent;
  let fixture: ComponentFixture<TransactionWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
