import { Component, OnInit } from '@angular/core';
import { AppDialogService } from '@app/core/services/app-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dialogSvc: AppDialogService) {}

  ngOnInit(): void {}

  onAddClick() {}
}
