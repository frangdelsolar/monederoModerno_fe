import { Currency } from './currency.interface';

export interface BankAccount {
  status: string;
  id: number;
  name: string;
  description: string;
  bank: string;
  total: Currency;
  order: number;
}
