import { Component, OnInit } from '@angular/core';
import { TransactionService } from '@app/core/controllers/transaction.controller';
import FREQUENCIES, {
  FREQUENCIES_DISPLAY,
  FREQUENCY_ITEMS,
} from '@app/core/enums/frequency.enum';
import GOAL_TYPES, {
  GOAL_TYPES_DISPLAY,
  GOAL_TYPE_ITEMS,
} from '@app/core/enums/goal_type.enum';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})
export class TransactionsTableComponent implements OnInit {
  items: any[] = [];
  constructor(private transactionSvc: TransactionService) {}

  ngOnInit(): void {
    this.transactionSvc.getAll().subscribe((items: any) => {
      this.items = items.map((item: any) => {
        let element = {
          ...item,
        };

        element['goal_type'] =
          GOAL_TYPES_DISPLAY[item.goal_type as keyof typeof GOAL_TYPES];
        element['frequency'] =
          FREQUENCIES_DISPLAY[item.frequency as keyof typeof FREQUENCIES];
        return element;
      });
    });
  }
}
