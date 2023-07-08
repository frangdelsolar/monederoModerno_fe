import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  _apiUrl = environment.apiUrl + environment.apiExchangeRate;

  constructor(private privateSvc: PrivateApiService) {}

  public get() {
    return this.privateSvc.get(this._apiUrl, null, true);
  }
}
