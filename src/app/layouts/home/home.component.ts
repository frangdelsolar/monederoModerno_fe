import { Component, OnInit } from '@angular/core';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { DeductionFormComponent } from './components/deduction-form/deduction-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dialogSvc: AppDialogService) {}

  ngOnInit(): void {}

  onAddTransaction() {
    this.dialogSvc.show({
      component: DeductionFormComponent,
      data: {},
      params: {
        header: 'Añadir transacción',
        closable: true,
        maximizable: true,
        responsive: true,
        breakpoints: {
          '960px': '80vw',
          '640px': '100vw',
        },
      },
    });
  }
}
