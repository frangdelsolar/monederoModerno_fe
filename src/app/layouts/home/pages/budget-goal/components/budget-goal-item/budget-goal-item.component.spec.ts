import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGoalItemComponent } from './budget-goal-item.component';

describe('BudgetGoalItemComponent', () => {
  let component: BudgetGoalItemComponent;
  let fixture: ComponentFixture<BudgetGoalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetGoalItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetGoalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
