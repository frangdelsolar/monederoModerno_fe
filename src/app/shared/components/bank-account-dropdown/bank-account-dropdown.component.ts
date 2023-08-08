import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';

@Component({
  selector: 'app-bank-account-dropdown',
  templateUrl: './bank-account-dropdown.component.html',
  styleUrls: ['./bank-account-dropdown.component.scss'],
})
export class BankAccountDropdownComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Medio de Pago';
  @Input() control: FormControl = new FormControl(null, []);

  accounts: any[] = [];
  items: any[] = [];

  constructor(private bankSvc: BankAccountService) {}

  ngOnInit(): void {
    this.bankSvc.getAll().subscribe((res: any) => {
      this.accounts = res.accounts;

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
