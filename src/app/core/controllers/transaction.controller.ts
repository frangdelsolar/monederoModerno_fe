import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';
import { Transaction } from '../models/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  _apiUrl = environment.apiUrl + environment.apiTransaction;

  constructor(private privateSvc: PrivateApiService) {}

  public getById(id: string) {
    return this.privateSvc.get<Transaction>(
      this._apiUrl + id + '/',
      null,
      true
    );
  }
  public getAll() {
    return this.privateSvc.get(this._apiUrl, null, true);
  }

  public getActiveByDate(month: string, year: string) {
    const url = this._apiUrl + '?month=' + month + '&year=' + year;
    return this.privateSvc.get<Transaction[]>(url, null, true);
  }

  public create(data: Transaction) {
    return this.privateSvc.post<Transaction>(this._apiUrl, data, true);
  }
}
