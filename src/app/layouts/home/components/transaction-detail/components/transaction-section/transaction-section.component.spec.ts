import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSectionComponent } from './transaction-section.component';

describe('TransactionSectionComponent', () => {
  let component: TransactionSectionComponent;
  let fixture: ComponentFixture<TransactionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
