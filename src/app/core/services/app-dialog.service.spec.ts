import { TestBed } from '@angular/core/testing';
import { AppDialogService } from './app-dialog.service';
import { DialogData } from '@models/dialog.interface';

describe('AppDialogService', () => {
  let service: AppDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show dialog', () => {
    const dialogData: DialogData = {
      component: null,
      data: null,
      params: {},
    };
    service.show(dialogData);

    service.DialogShowObservable.subscribe((show) => {
      expect(show).toBeTrue();
    });

    service.DialogDataObservable.subscribe((data) => {
      expect(data).toEqual(dialogData);
    });
  });

  it('should close dialog', () => {
    service.DialogShowObservable.subscribe((show) => {
      expect(show).toBeFalse();
    });

    service.close();
  });
});
