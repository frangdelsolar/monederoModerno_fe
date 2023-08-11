import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGoalWidgetItemComponent } from './budget-goal-widget-item.component';

describe('BudgetGoalWidgetItemComponent', () => {
  let component: BudgetGoalWidgetItemComponent;
  let fixture: ComponentFixture<BudgetGoalWidgetItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetGoalWidgetItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetGoalWidgetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
