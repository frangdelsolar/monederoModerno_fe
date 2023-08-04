import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';
import { BankAccount } from '@app/core/models/bank-account.interface';

@Component({
  selector: 'app-bank-account-list',
  templateUrl: './bank-account-list.component.html',
  styleUrls: ['./bank-account-list.component.scss'],
})
export class BankAccountListComponent implements OnInit {
  items: BankAccount[];
  constructor(private bankSvc: BankAccountService) {}

  ngOnInit(): void {
    this.bankSvc.getAll().subscribe((res) => {
      this.items = res.accounts;
    });
  }
}
