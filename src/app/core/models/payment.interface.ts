import { Currency } from './currency.interface';

export interface Payment {
  id?: number;
  transaction: number;
  transaction_date: Date;
  currency: Currency;
  due_date: Date;
  installment_number: number;
}
