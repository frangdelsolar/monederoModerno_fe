import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';
import { BankAccount } from '@app/core/models/bank-account.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { MenuItem } from 'primeng/api';
import { BankAccountFormComponent } from '../bank-account-form/bank-account-form.component';

@Component({
  selector: 'app-bank-account-list',
  templateUrl: './bank-account-list.component.html',
  styleUrls: ['./bank-account-list.component.scss'],
})
export class BankAccountListComponent implements OnInit {
  items: BankAccount[];
  menuItems: MenuItem[] = [
    {
      label: 'Nueva',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        this.onNewWalletClick();
      },
    },
    // {
    //   label: 'Billeteras',
    //   icon: 'pi pi-fw pi-wallet',
    //   items: [
    //     {
    //       label: 'Nueva',
    //       icon: 'pi pi-fw pi-plus',
    //       command: () => {
    //         this.onNewWalletClick();
    //       },
    //     },
    //     {
    //       label: 'Ordenar',
    //       icon: 'pi pi-fw pi-sort',
    //       command: () => {},
    //     },
    //   ],
    // },
    // {
    //   label: 'Tarjetas de crédito',
    //   icon: 'pi pi-fw pi-credit-card',
    //   items: [
    //     {
    //       label: 'Nueva',
    //       icon: 'pi pi-fw pi-plus',
    //       command: () => {},
    //     },
    //   ],
    // },
  ];
  constructor(
    private bankSvc: BankAccountService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.bankSvc.getAll().subscribe((res) => {
      this.items = res.accounts;
    });
  }

  onNewWalletClick() {
    this.dialogSvc.show({
      component: BankAccountFormComponent,
      data: {},
      params: {
        header: 'Nueva billetera',
        closable: true,
        maximizable: true,
      },
    });
  }
}
