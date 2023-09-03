import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TaskService } from '@app/core/controllers/task-controller.service copy';
import { Task } from '@app/core/models/task.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  editModeOn = false;
  task: Task;

  label = 'Detalle';
  labelForNameControl = 'Nombre';
  labelForDescriptionControl = 'Descripción';

  form: FormGroup;
  titleControl: FormControl = new FormControl(null, [Validators.required]);
  descriptionControl: FormControl = new FormControl(null, [
    Validators.required,
  ]);
  effectiveFromControl: FormControl = new FormControl<Date | null>(null, [
    Validators.required,
  ]);
  effectiveToControl: FormControl = new FormControl(null, []);

  saveBtnLabel = 'Guardar';
  saveBtnAction = () => {};

  constructor(
    private taskSvc: TaskService,
    private fb: FormBuilder,
    private toastSvc: ToastService,
    private dialogSvc: AppDialogService
  ) {
    this.form = this.fb.group({
      title: this.titleControl,
      description: this.descriptionControl,
      effective_from: this.effectiveFromControl,
      effective_to: this.effectiveToControl,
    });
    this.saveBtnAction = this.onSaveClick;
  }

  ngOnInit(): void {
    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      if (data.data.item) {
        let item = data.data.item;

        this.editModeOn = true;
        this.task = item;
        this.saveBtnAction = this.onUpdateClick;
        this.saveBtnLabel = 'Actualizar';

        if (item) {
          this.titleControl.setValue(item.title);
          this.descriptionControl.setValue(item.description);
          let effectiveFrom = new Date(
            item.effective_periods[0].effective_from
          );
          this.effectiveFromControl.setValue(effectiveFrom);
        }
      }
    });
  }

  onUpdateClick() {
    if (!this.task || !this.task.id) return;
    this.taskSvc
      .update(this.task.id, {
        title: this.titleControl.value,
        description: this.descriptionControl.value,
      })
      .subscribe(
        (res) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Tarea actualizada',
            detail: 'La tarea se ha actualizado correctamente',
          });
          window.location.reload();
        },
        (err) => {
          err.error.errors.map((error: any) => {
            let fieldName = error.field;
            this.form.controls[fieldName].setErrors({
              serverError: error.message,
            });
            this.form.controls[fieldName].markAsDirty();
            this.form.controls[fieldName].markAsTouched();
          });
        }
      );
  }

  onSaveClick() {
    this.taskSvc
      .create({
        title: this.titleControl.value,
        description: this.descriptionControl.value,
        effective_from: this.effectiveFromControl.value,
        effective_to: this.effectiveToControl.value,
      })
      .subscribe(
        (res) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Tarea creada',
            detail: 'La tarea se ha creado correctamente',
          });
          window.location.reload();
        },
        (err) => {
          err.error.errors.map((error: any) => {
            let fieldName = error.field;
            this.form.controls[fieldName].setErrors({
              serverError: error.message,
            });
            this.form.controls[fieldName].markAsDirty();
            this.form.controls[fieldName].markAsTouched();
          });
        }
      );
  }
}
