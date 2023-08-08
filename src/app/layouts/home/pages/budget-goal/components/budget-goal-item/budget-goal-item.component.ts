import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-goal-item',
  templateUrl: './budget-goal-item.component.html',
  styleUrls: ['./budget-goal-item.component.scss'],
})
export class BudgetGoalItemComponent implements OnInit {
  @Input() item: any;

  constructor() {}

  ngOnInit(): void {}
}
