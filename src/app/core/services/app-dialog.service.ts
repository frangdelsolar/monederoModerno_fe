import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { DialogData } from '@models/dialog.interface';
import { DeviceService } from './device.service';

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

  constructor(private deviceSvc: DeviceService) {}

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
    let isMobile = this.deviceSvc.isMobile();
    if (isMobile) {
      data.params.width = '100%';
    }
    this.DataObservable.next(data);
    this.DialogShow();
  }

  public close() {
    this.ShowObservable.next(false);
  }
}
