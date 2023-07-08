import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceProviderService {
  _apiUrl = environment.apiUrl + environment.apiServiceProvider;

  constructor(private privateSvc: PrivateApiService) {}

  public getAll() {
    return this.privateSvc.get(this._apiUrl, null, true);
  }

  public create(data: any) {
    return this.privateSvc.post(this._apiUrl, data, true);
  }
}
