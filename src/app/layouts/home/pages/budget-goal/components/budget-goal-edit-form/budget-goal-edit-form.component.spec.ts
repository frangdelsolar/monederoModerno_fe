import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGoalEditFormComponent } from './budget-goal-edit-form.component';

describe('BudgetGoalEditFormComponent', () => {
  let component: BudgetGoalEditFormComponent;
  let fixture: ComponentFixture<BudgetGoalEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetGoalEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetGoalEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
