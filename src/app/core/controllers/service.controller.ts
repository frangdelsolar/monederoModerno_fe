import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  serviceApiUrl = environment.apiUrl + environment.apiService;
  productApiUrl = environment.apiUrl + environment.apiProduct;

  constructor(private privateSvc: PrivateApiService) {}

  public getAll() {
    return this.privateSvc.get(this.serviceApiUrl, null, true);
  }

  public getByType(type: string) {
    const url = this.serviceApiUrl + '?type=' + type;
    return this.privateSvc.get(url, null, true);
  }

  public create(data: any) {
    return this.privateSvc.post(this.serviceApiUrl, data, true);
  }

  getAllProducts() {
    return this.privateSvc.get(this.productApiUrl, null, true);
  }

  public delete(id: number) {
    const url = this.serviceApiUrl + id;
    return this.privateSvc.delete(url, true);
  }

  public update(id: any, data: any) {
    const url = this.serviceApiUrl + id + '/';
    return this.privateSvc.put(url, data, true);
  }
}
