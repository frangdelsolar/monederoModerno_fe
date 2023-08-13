import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetGoalService } from '@app/core/controllers/budget-goal-controller.service';
import { AppDialogService } from '@app/core/services/app-dialog.service';

@Component({
  selector: 'app-budget-goal-edit-form',
  templateUrl: './budget-goal-edit-form.component.html',
  styleUrls: ['./budget-goal-edit-form.component.scss'],
})
export class BudgetGoalEditFormComponent implements OnInit {
  editModeOn = true;
  item: any;
  goalType = [
    { value: 'PERCENTAGE', name: 'Porcentaje' },
    { value: 'AMOUNT', name: 'Monto' },
  ];

  form: FormGroup;
  effectiveFromControl: FormControl = new FormControl(null, [
    Validators.required,
  ]);
  effectiveToControl: FormControl = new FormControl(null, []);

  saveBtnLabel = 'Guardar';
  saveBtnAction = () => {};

  constructor(
    private dialogSvc: AppDialogService,
    private goalSvc: BudgetGoalService
  ) {}

  ngOnInit(): void {
    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      let item = data.data.item;
      if (item) {
        this.effectiveFromControl.setValue(item.effective_from);
        this.effectiveToControl.setValue(item.effective_to);
        this.item = item;
      }
    });
  }

  onSave() {
    let effective_to = this.effectiveToControl.value;
    if (effective_to == null) {
      this.effectiveToControl.markAsTouched();
      this.effectiveToControl.markAsDirty();
      this.effectiveToControl.setErrors({
        serverError: 'Este campo es requerido',
      });
      return;
    }

    let effective_from = new Date(this.effectiveFromControl.value);
    if (effective_to < effective_from) {
      this.effectiveToControl.markAsTouched();
      this.effectiveToControl.markAsDirty();
      this.effectiveToControl.setErrors({
        serverError: 'La fecha de fin no puede ser menor a la fecha de inicio',
      });
      return;
    }

    let data = {
      effective_to: effective_to,
    };

    this.goalSvc.update(this.item.id, data).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {
        err.error.errors.forEach((error: any) => {
          let control = this.form.get(error.field);
          control?.setErrors({ serverError: error.message });
          control?.markAsDirty();
          control?.markAsTouched();
        });
      }
    );
  }
}
