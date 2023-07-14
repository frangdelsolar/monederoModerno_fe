import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  _apiUrl = environment.apiUrl + environment.apiExchangeRate;

  constructor(private privateSvc: PrivateApiService) {}

  public get(date: string) {
    const url = this._apiUrl + '?date=' + date;
    return this.privateSvc.get(url, null, true);
  }
}
