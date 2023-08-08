import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGoalListComponent } from './budget-goal-list.component';

describe('BudgetGoalListComponent', () => {
  let component: BudgetGoalListComponent;
  let fixture: ComponentFixture<BudgetGoalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetGoalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
