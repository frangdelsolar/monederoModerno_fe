import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  _apiUrl = environment.apiUrl + environment.apiImage;

  constructor(private privateSvc: PrivateApiService) {}

  public get() {
    return this.privateSvc.get(this._apiUrl, null, false);
  }

  public uploadImage(data: any) {
    return this.privateSvc.post(this._apiUrl, data, true);
  }
  public update(id: any, data: any) {
    const url = this._apiUrl + id + '/';
    return this.privateSvc.put(url, data, true);
  }

  public delete(id: any) {
    const url = this._apiUrl + id + '/';
    return this.privateSvc.delete(url, true);
  }
}
