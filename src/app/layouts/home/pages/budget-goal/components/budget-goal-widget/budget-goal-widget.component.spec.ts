import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGoalWidgetComponent } from './budget-goal-widget.component';

describe('BudgetGoalWidgetComponent', () => {
  let component: BudgetGoalWidgetComponent;
  let fixture: ComponentFixture<BudgetGoalWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetGoalWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetGoalWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
