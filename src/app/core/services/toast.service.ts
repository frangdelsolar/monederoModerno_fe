import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastData } from '@models/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private DataObservable: BehaviorSubject<ToastData> =
    new BehaviorSubject<ToastData>({
      severity: '',
      summary: '',
      detail: '',
      sticky: false,
    });

  constructor() {}

  get ToastDataObservable(): Observable<ToastData> {
    return this.DataObservable.asObservable();
  }

  public add(data: ToastData) {
    this.DataObservable.next(data);
  }
}
