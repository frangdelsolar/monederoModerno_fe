import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-edit-actions',
  templateUrl: './edit-actions.component.html',
  styleUrls: ['./edit-actions.component.scss'],
})
export class EditActionsComponent implements OnInit {
  isAuth: boolean = true;

  @Input() editModeOn: boolean = true;
  @Output() editModeOnChange: EventEmitter<boolean> = new EventEmitter();

  @Input() saveCallback: Function = () => {};
  @Input() addCallback: Function = () => {};
  @Input() deleteCallback: Function = () => {};
  @Input() addButtonOn: boolean = false;
  @Input() saveButtonOn: boolean = true;
  @Input() preventDefaultSave: boolean = false;
  @Input() deleteButtonOn: boolean = false;
  @Input() cancelButtonLabel: string = 'Cancel';

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.isAuthenticatedObservable.subscribe((isAuth: boolean) => {
      this.isAuth = isAuth;
    });
  }

  onAddClick() {
    this.addCallback();
  }

  onEditClick() {
    this.editModeOn = true;
    this.editModeOnChange.emit(this.editModeOn);
  }

  onCancelClick() {
    this.editModeOn = false;
    this.editModeOnChange.emit(this.editModeOn);
  }

  onSaveClick() {
    if (!this.preventDefaultSave) {
      this.editModeOn = false;
      this.editModeOnChange.emit(this.editModeOn);
    }

    if (this.isAuth) {
      this.saveCallback();
    }
  }

  onDeleteClick() {
    this.editModeOn = false;
    this.editModeOnChange.emit(this.editModeOn);
    if (this.isAuth) {
      this.deleteCallback();
    }
  }
}
