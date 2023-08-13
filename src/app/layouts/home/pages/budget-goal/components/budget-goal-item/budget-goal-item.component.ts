import { Component, Input, OnInit } from '@angular/core';
import { BudgetGoalService } from '@app/core/controllers/budget-goal-controller.service';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { BudgetGoalEditFormComponent } from '../budget-goal-edit-form/budget-goal-edit-form.component';

@Component({
  selector: 'app-budget-goal-item',
  templateUrl: './budget-goal-item.component.html',
  styleUrls: ['./budget-goal-item.component.scss'],
})
export class BudgetGoalItemComponent implements OnInit {
  @Input() item: any;
  @Input() showMenu = true;
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
    private goalSvc: BudgetGoalService,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {}

  onEditClick() {
    this.dialogSvc.show({
      component: BudgetGoalEditFormComponent,
      data: {
        item: this.item,
      },
      params: {
        header: 'Editar Objetivo',
        closable: true,
      },
    });
  }

  onDeleteClick() {
    this.confirmationService.confirm({
      header: 'Eliminar Objetivo',
      message: '¿Está seguro que desea continuar?',
      accept: () => {
        this.goalSvc.delete(this.item.id).subscribe(
          (res) => {
            this.toastSvc.add({
              severity: 'success',
              summary: 'Objetivo eliminado',
              detail: 'El objetivo se eliminó correctamente',
            });
            window.location.reload();
          },
          (err) => {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'Ocurrió un error al eliminar el presupuesto. ' +
                err.error.message,
            });
          }
        );
      },
    });
  }
}
