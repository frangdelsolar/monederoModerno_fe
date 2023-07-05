import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '../models/user.interface';
import { PrivateApiService } from '../services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _apiUrl = environment.apiUrl + environment.apiRegisterUser;

  constructor(private adminSvc: PrivateApiService) {}

  public create(user: any) {
    return this.adminSvc.post<any>(this._apiUrl, user, true);
  }
}
