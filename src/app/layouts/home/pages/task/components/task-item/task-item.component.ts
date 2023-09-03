import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskService } from '@app/core/controllers/task-controller.service copy';
import { Task } from '@app/core/models/task.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskTableComponent } from '../task-table/task-table.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() item: Task;
  @Input() showMenu = true;
  @Input() showStatus = true;

  completedControl = new FormControl(false, [Validators.required]);

  menuItems: any[] = [
    {
      label: 'Editar',
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        this.onEditClick();
      },
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-fw pi-trash',
      command: () => {
        this.onDeleteClick();
      },
    },
  ];
  constructor(
    private dialogSvc: AppDialogService,
    private confirmationService: ConfirmationService,
    private taskSvc: TaskService,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {
    if (this.item.status?.completed != null) {
      this.completedControl.setValue(this.item.status.completed);
    }
  }

  onCompletedClick() {
    let header = 'Completar tarea';
    let new_status = !this.completedControl.value;
    if (this.completedControl.value == true) {
      header = 'Descompletar tarea';
    }
    this.confirmationService.confirm({
      header: header,
      message: '¿Está seguro que desea continuar?',
      accept: () => {
        if (this.item.status?.id) {
          this.taskSvc
            .updateStatus(this.item.status.id, {
              completed: new_status,
              completion_date: new Date(),
              effective_date: this.item.status.effective_date,
              task: this.item.id,
            })
            .subscribe(
              (res) => {
                this.toastSvc.add({
                  severity: 'success',
                  summary: 'Tarea actualizada',
                  detail: 'La tarea se actualizó correctamente',
                });
                window.location.reload();
              },
              (err) => {
                this.toastSvc.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'Ocurrió un error al actualizar la tarea. ' +
                    err.error.message,
                });
              }
            );
        }
      },
    });
  }

  onViewClick() {
    this.dialogSvc.show({
      component: TaskTableComponent,
      data: {
        item: this.item,
      },
      params: {
        header: 'Ver Pagos',
        closable: true,
        maximizable: true,
      },
    });
  }

  onEditClick() {
    this.dialogSvc.show({
      component: TaskFormComponent,
      data: {
        item: this.item,
      },
      params: {
        header: 'Editar billetera',
        closable: true,
      },
    });
  }

  onDeleteClick() {
    this.confirmationService.confirm({
      header: 'Eliminar tarea',
      message: '¿Está seguro que desea continuar?',
      accept: () => {
        if (this.item.id) {
          this.taskSvc.delete(this.item.id).subscribe(
            (res) => {
              this.toastSvc.add({
                severity: 'success',
                summary: 'Tarea eliminada',
                detail: 'La tarea se eliminó correctamente',
              });
              window.location.reload();
            },
            (err) => {
              this.toastSvc.add({
                severity: 'error',
                summary: 'Error',
                detail:
                  'Ocurrió un error al eliminar la billetera. ' +
                  err.error.message,
              });
            }
          );
        }
      },
    });
  }
}
