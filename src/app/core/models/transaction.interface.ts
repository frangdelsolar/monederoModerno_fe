import { Currency } from './currency.interface';
import { ServiceProvider } from './service-provider.interface';
import { Service } from './service.interface';

export interface Transaction {
  id?: number;
  transaction_type: string;
  service: Service;
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
}
