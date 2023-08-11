import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-goal-widget-item',
  templateUrl: './budget-goal-widget-item.component.html',
  styleUrls: ['./budget-goal-widget-item.component.scss'],
})
export class BudgetGoalWidgetItemComponent implements OnInit {
  @Input() item: any;

  constructor() {}

  ngOnInit(): void {}
}
