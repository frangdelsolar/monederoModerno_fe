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
      label: 'Eliminar',
      icon: 'pi pi-fw pi-trash',
      command: () => {
        this.onDeleteClick();
      },
    },
    // {
    //   label: 'Reajustar Saldo',
    //   icon: 'pi pi-fw pi-wrench',
    //   command: () => {
    //     this.onAdjustClick();
    //   },
    // },
    // {
    //   label: 'Recalcular',
    //   icon: 'pi pi-fw pi-calculator',
    //   command: () => {
    //     this.onCalculateClick();
    //   },
    // },
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
          },
          (err) => {
            this.toastSvc.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'Ocurrió un error al eliminar la billetera. ' + err.message,
            });
          }
        );
      },
    });
  }
}
