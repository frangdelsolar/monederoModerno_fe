import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from '@app/core/models/task.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { MenuItem } from 'primeng/api';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit {
  @Input() tasks: Task[] = [];

  constructor(private dialogSvc: AppDialogService) {}

  ngOnInit(): void {}

  getControl(status: boolean) {
    return new FormControl(status, []);
  }

  getTaskMenuItems(task: any): MenuItem[] {
    return [
      {
        label: 'Añadir periodo efectivo',
        icon: 'pi pi-fw pi-calendar-plus',
        command: () => {
          this.onAddEffectivePeriodClick(task);
        },
      },
    ];
  }

  getEffectivePeriodMenuItems(task: any): MenuItem[] {
    return [
      {
        label: 'Cerrar periodo efectivo',
        icon: 'pi pi-fw pi-calendar-plus',
        command: () => {
          this.onCloseEffectivePeriodClick(task);
        },
      },
    ];
  }
  onAddEffectivePeriodClick(task: Task) {
    this.dialogSvc.show({
      component: TaskFormComponent,
      data: {
        item: task,
        action: 'addPeriod',
      },
      params: {
        header: 'Añadir periodo efectivo',
        closable: true,
      },
    });
  }
  onCloseEffectivePeriodClick(task: Task) {
    this.dialogSvc.show({
      component: TaskFormComponent,
      data: {
        item: task,
        action: 'closePeriod',
      },
      params: {
        header: 'Cerrar periodo efectivo',
        closable: true,
      },
    });
  }
}
