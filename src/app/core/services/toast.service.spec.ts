import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastData } from '@models/toast.interface';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit toast data', () => {
    const toastData: ToastData = {
      severity: 'info',
      summary: 'Toast Summary',
      detail: 'Toast Detail',
      sticky: false,
    };
    service.add(toastData);

    service.ToastDataObservable.subscribe((data) => {
      expect(data).toEqual(toastData);
    });
  });
});
