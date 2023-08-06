import { Component, Input, OnInit } from '@angular/core';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';
import { BankAccount } from '@app/core/models/bank-account.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { BankAccountFormComponent } from '../bank-account-form/bank-account-form.component';

@Component({
  selector: 'app-bank-account-item',
  templateUrl: './bank-account-item.component.html',
  styleUrls: ['./bank-account-item.component.scss'],
})
export class BankAccountItemComponent implements OnInit {
  @Input() item: BankAccount;
  menuItems: any[] = [
    {
      label: 'Editar',
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        this.onEditClick();
      },
    },
    {
      label: 'Ajustar Saldo',
      icon: 'pi pi-fw pi-angle-double-up',
      command: () => {
        this.onAdjustClick();
      },
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-fw pi-trash',
      command: () => {
        this.onDeleteClick();
      },
    },

    {
      label: 'Recalcular',
      icon: 'pi pi-fw pi-sync',
      command: () => {
        this.onCalculateClick();
      },
    },
  ];
  constructor(
    private dialogSvc: AppDialogService,
    private confirmationService: ConfirmationService,
    private bankSvc: BankAccountService,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {}

  onEditClick() {
    this.dialogSvc.show({
      component: BankAccountFormComponent,
      data: {
        item: this.item,
      },
      params: {
        header: 'Editar billetera',
        closable: true,
      },
    });
  }

  onAdjustClick() {
    this.dialogSvc.show({
      component: BankAccountFormComponent,
      data: {
        item: this.item,
        adjust: true,
      },
      params: {
        header: 'Ajustar saldo',
        closable: true,
      },
    });
  }

  onCalculateClick() {
    this.confirmationService.confirm({
      header: 'Recalcular total',
      message: '¿Está seguro que desea continuar?',
      accept: () => {
        this.bankSvc.recalculateTotals(this.item.id).subscribe(
          (res) => {
            this.toastSvc.add({
              severity: 'success',
              summary: 'Total actualizado',
              detail: 'La billetera se actualizó correctamente',
            });
            window.location.reload();
          },
          (err) => {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'Ocurrió un error al actualizar la billetera. ' +
                err.error.message,
            });
          }
        );
      },
    });
  }

  onDeleteClick() {
    this.confirmationService.confirm({
      header: 'Eliminar billetera',
      message: '¿Está seguro que desea continuar?',
      accept: () => {
        this.bankSvc.delete(this.item.id).subscribe(
          (res) => {
            this.toastSvc.add({
              severity: 'success',
              summary: 'Billetera eliminada',
              detail: 'La billetera se eliminó correctamente',
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
      },
    });
  }
}
