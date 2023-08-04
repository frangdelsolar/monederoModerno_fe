import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '../models/user.interface';
import { PrivateApiService } from '../services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  registerApiUrl = environment.apiUrl + environment.apiRegisterUser;
  validateUserApiUrl = environment.apiUrl + environment.apiValidateUser;

  constructor(private adminSvc: PrivateApiService) {}

  public create(user: any) {
    return this.adminSvc.post<any>(this.registerApiUrl, user, false);
  }

  public validateUser(user: any) {
    return this.adminSvc.post<any>(this.validateUserApiUrl, user, false);
  }
}
