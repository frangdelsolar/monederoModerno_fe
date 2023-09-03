import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.interface';
import { PrivateApiService } from '../services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  _apiUrl = environment.apiUrl + environment.apiUrlTask;
  _apiUrlStatus = environment.apiUrl + environment.apiUrlTaskStatus;

  constructor(private adminSvc: PrivateApiService) {}

  public get(id: number) {
    return this.adminSvc.get<Task>(this._apiUrl, id, true);
  }

  public getAll(params: any = null) {
    return this.adminSvc.get<any>(this._apiUrl, null, true, params);
  }

  public create(body: any) {
    return this.adminSvc.post<any>(this._apiUrl, body, true);
  }

  public update(id: number, body: any) {
    let url = this._apiUrl + id + '/';
    return this.adminSvc.put<any>(url, body, true);
  }

  public updateStatus(id: number, body: any) {
    let url = this._apiUrlStatus + id + '/';
    return this.adminSvc.put<any>(url, body, true);
  }

  public delete(id: number) {
    let url = this._apiUrl + id + '/';
    return this.adminSvc.delete<any>(url, true);
  }
}
