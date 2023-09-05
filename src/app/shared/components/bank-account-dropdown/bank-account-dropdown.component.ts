import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';
import { BankAccount } from '@app/core/models/bank-account.interface';

@Component({
  selector: 'app-bank-account-dropdown',
  templateUrl: './bank-account-dropdown.component.html',
  styleUrls: ['./bank-account-dropdown.component.scss'],
})
export class BankAccountDropdownComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Medio de Pago';
  @Input() control: FormControl = new FormControl(null, []);
  @Input() exclude: BankAccount[] = [];

  accounts: any[] = [];
  items: any[] = [];

  constructor(private bankSvc: BankAccountService) {}

  filterArrayById(a: any[], b: any[]): any[] {
    const idsToExclude = b.map((item) => item.id);
    return a.filter((item) => !idsToExclude.includes(item.id));
  }

  ngOnInit(): void {
    this.bankSvc.getAll().subscribe((res: any) => {
      this.accounts = res.accounts;
      this.accounts = this.filterArrayById(this.accounts, this.exclude);
      this.items = this.accounts.map((item) => {
        return {
          id: item.id,
          name:
            item.name +
            ' - ' +
            item.total.currency +
            ' $' +
            item.total.amount.toFixed(2),
        };
      });
    });
  }
}
