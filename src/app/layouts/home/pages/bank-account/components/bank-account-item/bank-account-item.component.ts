import { Component, Input, OnInit } from '@angular/core';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';
import { BankAccount } from '@app/core/models/bank-account.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { BankAccountFormComponent } from '../bank-account-form/bank-account-form.component';
import { BankAccountInstructionsComponent } from '../bank-account-instructions/bank-account-instructions.component';
import { PaymentsTableComponent } from '../payments-table/payments-table.component';
import { TransferFormComponent } from '../transfer-form/transfer-form.component';

@Component({
  selector: 'app-bank-account-item',
  templateUrl: './bank-account-item.component.html',
  styleUrls: ['./bank-account-item.component.scss'],
})
export class BankAccountItemComponent implements OnInit {
  @Input() item: BankAccount;
  @Input() showMenu = true;
  menuItems: any[] = [
    {
      label: 'Ver transacciones',
      icon: 'pi pi-fw pi-eye',
      command: () => {
        this.onViewClick();
      },
    },
    {
      label: 'Instrucciones',
      icon: 'pi pi-fw pi-directions',
      command: () => {
        this.onViewInstructionsClick();
      },
    },

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
      label: 'Recalcular',
      icon: 'pi pi-fw pi-history',
      command: () => {
        this.onCalculateClick();
      },
    },
    {
      label: 'Transferir',
      icon: 'pi pi-fw pi-sync',
      command: () => {
        this.onTransferClick();
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
    private bankSvc: BankAccountService,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {}

  onViewClick() {
    this.dialogSvc.show({
      component: PaymentsTableComponent,
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

  onViewInstructionsClick() {
    this.dialogSvc.show({
      component: BankAccountInstructionsComponent,
      data: {
        item: this.item,
      },
      params: {
        header: 'Ver Instrucciones',
        closable: true,
        maximizable: true,
      },
    });
  }

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

  onTransferClick() {
    this.dialogSvc.show({
      component: TransferFormComponent,
      data: {
        item: this.item,
        adjust: true,
      },
      params: {
        header: 'Transferir entre cuentas',
        closable: true,
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
