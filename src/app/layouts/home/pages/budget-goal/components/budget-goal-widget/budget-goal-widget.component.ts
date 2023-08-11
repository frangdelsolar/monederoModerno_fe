import { Component, OnInit } from '@angular/core';
import { BudgetGoalService } from '@app/core/controllers/budget-goal-controller.service';
import { MonthSelectorService } from '@app/core/services/month-selector.service';

@Component({
  selector: 'app-budget-goal-widget',
  templateUrl: './budget-goal-widget.component.html',
  styleUrls: ['./budget-goal-widget.component.scss'],
})
export class BudgetGoalWidgetComponent implements OnInit {
  items: any[] = [];

  today = new Date();
  month: number = this.today.getMonth() + 1;
  year: number = this.today.getFullYear();
  constructor(
    private monthSelectorSvc: MonthSelectorService,
    private goalSvc: BudgetGoalService
  ) {}

  ngOnInit(): void {
    this.getStats();

    this.monthSelectorSvc.dateControl.valueChanges.subscribe((value) => {
      this.month = value.getMonth() + 1;
      this.year = value.getFullYear();
      this.getStats();
    });
  }

  getStats() {
    this.goalSvc
      .getStats({ month: this.month, year: this.year })
      .subscribe((res) => {
        this.items = res;
      });
  }
}
