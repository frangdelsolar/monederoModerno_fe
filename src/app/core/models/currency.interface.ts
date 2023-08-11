export interface Currency {
  id?: number;
  currency: string;
  amount: number;
  rate: number;
  converted_amount: number;
  converted_currency: string;
  ars: number;
  usd: number;
  ars_usd: number;
}
