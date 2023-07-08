import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  _apiUrl = environment.apiUrl + environment.apiService;

  constructor(private privateSvc: PrivateApiService) {}

  public getAll() {
    return this.privateSvc.get(this._apiUrl, null, true);
  }

  public getByType(type: string) {
    const url = this._apiUrl + '?type=' + type;
    return this.privateSvc.get(url, null, true);
  }

  public create(data: any) {
    return this.privateSvc.post(this._apiUrl, data, true);
  }
}
