import { Currency } from './currency.interface';
import { ServiceProvider } from './service-provider.interface';
import { Service } from './service.interface';

export interface Transaction {
  id?: number;
  transaction_type: string;
  service: Service;
  product?: string;
  service_provider: ServiceProvider;
  frequency: string;
  frequency_day?: string;
  frequency_month?: string;
  start_date: Date;
  goal_type?: string;
  repetitions?: number;
  end_date?: Date;
  goal_currency: Currency;
  comment?: string;
  currency: Currency;
  due_date?: Date;
  payment?: any;
  payments?: any;
  installment_number?: number;
  total_paid?: Currency;
  status?: string;
  tags?: any;
  default_account?: any;
}
