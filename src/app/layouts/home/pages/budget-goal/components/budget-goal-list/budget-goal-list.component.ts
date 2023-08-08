import { Component, OnInit } from '@angular/core';
import { BudgetGoalService } from '@app/core/controllers/budget-goal-controller.service';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { MenuItem } from 'primeng/api';
import { BudgetGoalFormComponent } from '../budget-goal-form/budget-goal-form.component';

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
  constructor(
    private goalSvc: BudgetGoalService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.goalSvc.getAll().subscribe((res) => {
      this.items = res;
    });
  }

  onNewGoalClick() {
    this.dialogSvc.show({
      component: BudgetGoalFormComponent,
      data: {},
      params: {
        header: 'Nuevo presupuesto',
        closable: true,
        maximizable: true,
      },
    });
  }
}
