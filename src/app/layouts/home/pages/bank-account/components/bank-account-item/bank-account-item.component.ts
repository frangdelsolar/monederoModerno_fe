import { Component, Input, OnInit } from '@angular/core';
import { BankAccount } from '@app/core/models/bank-account.interface';

@Component({
  selector: 'app-bank-account-item',
  templateUrl: './bank-account-item.component.html',
  styleUrls: ['./bank-account-item.component.scss'],
})
export class BankAccountItemComponent implements OnInit {
  @Input() item: BankAccount;

  constructor() {}

  ngOnInit(): void {}

  showDetail() {}
}
