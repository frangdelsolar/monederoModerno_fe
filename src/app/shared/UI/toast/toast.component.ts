import { Component, OnInit } from '@angular/core';
import { ToastData } from '@models/toast.interface';
import { ToastService } from '@services/toast.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [MessageService],
})
export class ToastComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {
    this.toastSvc.ToastDataObservable.subscribe((data: ToastData) => {
      this.messageService.add(data);
    });
  }
}
