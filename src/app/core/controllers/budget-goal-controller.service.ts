import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '../services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetGoalService {
  _apiUrl = environment.apiUrl + environment.apiBudgetGoal;
  _statsUrl = environment.apiUrl + environment.apiBudgetGoalStats;

  constructor(private adminSvc: PrivateApiService) {}

  public get(id: number) {
    return this.adminSvc.get<any>(this._apiUrl, id, true);
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

  public getStatsById(id: number) {
    let url = this._statsUrl + id + '/';
    return this.adminSvc.get<any>(url, null, true);
  }

  public getStats(params: any) {
    return this.adminSvc.get<any>(this._statsUrl, null, true, params);
  }
}
