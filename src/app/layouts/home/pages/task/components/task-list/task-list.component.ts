import { Component, OnInit } from '@angular/core';
import { TaskService } from '@app/core/controllers/task-controller.service copy';
import { Task } from '@app/core/models/task.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { MenuItem } from 'primeng/api';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  items: Task[];
  menuItems: MenuItem[] = [
    {
      label: 'Nueva',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        this.onNewWalletClick();
      },
    },
  ];
  constructor(
    private taskSvc: TaskService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.taskSvc.getAll().subscribe((res: any) => {
      this.items = res;
    });
  }

  onNewWalletClick() {
    this.dialogSvc.show({
      component: TaskFormComponent,
      data: {},
      params: {
        header: 'Nueva tarea',
        closable: true,
        maximizable: true,
      },
    });
  }
}
