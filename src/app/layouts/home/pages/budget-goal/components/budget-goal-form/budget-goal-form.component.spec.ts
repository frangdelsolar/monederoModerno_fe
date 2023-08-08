import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGoalFormComponent } from './budget-goal-form.component';

describe('BudgetGoalFormComponent', () => {
  let component: BudgetGoalFormComponent;
  let fixture: ComponentFixture<BudgetGoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetGoalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
