import { Component, Input, OnInit } from '@angular/core';
import { BankAccount } from '@app/core/models/bank-account.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-bank-account-item',
  templateUrl: './bank-account-item.component.html',
  styleUrls: ['./bank-account-item.component.scss'],
})
export class BankAccountItemComponent implements OnInit {
  @Input() item: BankAccount;
  menuItems: any[] = [
    // {
    //   label: 'Ver transacciones',
    //   icon: 'pi pi-fw pi-list',
    //   command: () => {
    //     this.onViewClick();
    //   }
    // },
    {
      label: 'Editar',
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        this.onEditClick();
      },
    },
    {
      label: 'Reajustar Saldo',
      icon: 'pi pi-fw pi-wrench',
      command: () => {
        this.onAdjustClick();
      },
    },
    {
      label: 'Recalcular',
      icon: 'pi pi-fw pi-calculator',
      command: () => {
        this.onCalculateClick();
      },
    },
  ];
  constructor(
    private dialogSvc: AppDialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  showDetail() {
    this.dialogSvc.show({
      component: BankAccountItemComponent,
      data: {
        // transactionId: this.transaction.id,
        // month: this.month,
        // year: this.year,
      },
      params: {
        header: 'Detalle de transacción',
        closable: true,
        maximizable: true,
        responsive: true,
        position: 'center',
        dismissableMask: true,
      },
    });
  }

  onViewClick() {
    // const ref = this.dialogService.open(AddBankAccountComponent, {
    //   header: 'Transacciones',
    //   resizable: true,
    //   draggable: true,
    //   contentStyle: {'overflow': 'visible'},
    //   data: {
    //     bankAccount: this.item
    //   },
    // });
    // ref.onClose.subscribe((res: any) => {
    // });
  }

  onEditClick() {
    // const ref = this.dialogService.open(AddBankAccountComponent, {
    //   header: 'Editar Billetera',
    //   resizable: true,
    //   draggable: true,
    //   contentStyle: {'overflow': 'visible'},
    //   data: {
    //     bankAccount: this.item
    //   },
    // });
    // ref.onClose.subscribe((res: any) => {
    //     this.reloadCurrentRoute(this.router);
    // });
  }

  onArchiveClick(value: string, prompt: string) {
    // let data = {
    //   status: value
    // }
    // this.confirmationService.confirm({
    //     message: prompt,
    //     accept: () => {
    //       if(this.item){
    //         this.service.update(this.item.id, data).subscribe(
    //           (res)=>{
    //             this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Billetera actualizada'});
    //             this.reloadCurrentRoute(this.router);
    //           },
    //           (err)=>{
    //             this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error.message});
    //           }
    //         )
    //       }
    //     }
    // });
  }

  onAdjustClick() {
    // const ref = this.dialogSvc.open(AdjustBankAccountComponent, {
    //   header: 'Reajustar saldo de cuenta',
    //   resizable: true,
    //   draggable: true,
    //   contentStyle: {'overflow': 'visible'},
    //   data: {
    //     bankAccount: this.item
    //   },
    // });
    // ref.onClose.subscribe((res: any) => {
    //   // this.reloadCurrentRoute(this.router);
    // });
  }

  onCalculateClick() {
    this.confirmationService.confirm({
      message: '¿Quieres recalcular el saldo de esta billetera?',
      // accept: () => {
      //   if(this.item){
      //     this.service.recalc(this.item.id).subscribe(
      //       (res)=>{
      //         this.messageService.add({severity:'success', summary:'Operación exitosa', detail:'Billetera actualizada'});
      //         this.reloadCurrentRoute(this.router);
      //       },
      //       (err)=>{
      //         this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error.message});
      //       }
      //     )
      //   }
      // }
    });
  }
}
