import { Component, OnInit } from '@angular/core';
import { BudgetGoalService } from '@app/core/controllers/budget-goal-controller.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-budget-goal-list',
  templateUrl: './budget-goal-list.component.html',
  styleUrls: ['./budget-goal-list.component.scss'],
})
export class BudgetGoalListComponent implements OnInit {
  items: any[] = [];
  menuItems: MenuItem[] = [
    {
      label: 'Nuevo',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        this.onNewGoalClick();
      },
    },
  ];
  constructor(private goalSvc: BudgetGoalService) {}

  ngOnInit(): void {
    this.goalSvc.getAll().subscribe((res) => {
      this.items = res;
    });
  }

  onNewGoalClick() {}
}
