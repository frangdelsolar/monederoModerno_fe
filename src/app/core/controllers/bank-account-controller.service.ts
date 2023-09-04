import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BankAccount } from '../models/bank-account.interface';
import { PrivateApiService } from '../services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  _apiUrl = environment.apiUrl + environment.apiUrlBankAccount;
  _adjustUrl = environment.apiUrl + environment.apiUrlAdjustBankAccount;
  _reorderUrl = environment.apiUrl + 'api/reorder-accounts/';
  _instructionsUrl = environment.apiUrl + 'api/account-instructions/';

  constructor(private adminSvc: PrivateApiService) {}

  public get(id: number) {
    return this.adminSvc.get<BankAccount>(this._apiUrl, id, true);
  }

  public getAll() {
    return this.adminSvc.get<any>(this._apiUrl, null, true);
  }

  public create(body: any) {
    return this.adminSvc.post<any>(this._apiUrl, body, true);
  }

  public update(id: number, body: any) {
    let url = this._apiUrl + id + '/';
    return this.adminSvc.put<any>(url, body, true);
  }

  public delete(id: number) {
    let url = this._apiUrl + id + '/';
    return this.adminSvc.delete<any>(url, true);
  }

  public recalculateTotals(id: number) {
    return this.adminSvc.get<any>(this._adjustUrl, id, true);
  }

  public updateAccountTotal(id: number, body: any) {
    let url = this._adjustUrl + id + '/';
    return this.adminSvc.post<any>(url, body, true);
  }

  public getInstructions(id: number) {
    return this.adminSvc.get<any>(this._instructionsUrl, id, true);
  }

  public postInstructions(id: number, body: any) {
    let url = this._instructionsUrl + id + '/';
    return this.adminSvc.put<any>(url, body, true);
  }

  // public reorderAccounts(body: any) {
  //   return this.adminSvc.post<any>(this._reorderUrl, body, true);
  // }
}
