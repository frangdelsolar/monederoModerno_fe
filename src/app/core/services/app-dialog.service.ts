import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { DialogData } from '@models/dialog.interface';

@Injectable({
  providedIn: 'root',
})
export class AppDialogService {
  private DataObservable: BehaviorSubject<DialogData> =
    new BehaviorSubject<DialogData>({
      component: null,
      data: null,
      params: {},
    });

  private ShowObservable: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  private DialogShow() {
    this.ShowObservable.next(true);
  }

  get DialogShowObservable(): Observable<boolean> {
    return this.ShowObservable.asObservable();
  }

  get DialogDataObservable(): Observable<DialogData> {
    return this.DataObservable.asObservable();
  }

  public show(data: DialogData) {
    this.DataObservable.next(data);
    this.DialogShow();
  }

  public close() {
    this.ShowObservable.next(false);
  }
}
