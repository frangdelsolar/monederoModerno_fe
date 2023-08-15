import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceService } from '@app/core/controllers/service.controller';
import { TRANSACTION_TYPES_DISPLAY } from '@app/core/enums/transaction_type.enum';
import { AppDialogService } from '@app/core/services/app-dialog.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @Input() transactionType: string = 'EXPENSE';

  form: FormGroup;
  colorControl: FormControl = new FormControl('#ffffff', [Validators.required]);
  iconControl: FormControl = new FormControl('pi-image', [Validators.required]);
  nameControl: FormControl = new FormControl(null, [Validators.required]);

  item: any;

  buttonDisabled = true;
  buttonAction: any;
  buttonLabel = '';

  constructor(
    private fb: FormBuilder,
    private dialogSvc: AppDialogService,
    private categorySvc: ServiceService
  ) {
    this.form = this.fb.group({
      color: this.colorControl,
      icon: this.iconControl,
      name: this.nameControl,
      service_type: null,
    });
  }

  ngOnInit(): void {
    this.buttonAction = this.onSave;
    this.buttonLabel = 'Guardar';

    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      let edit = data.data.edit;
      if (edit) {
        this.item = data.data.category;
        this.colorControl.setValue(this.item.color);
        this.iconControl.setValue(this.item.icon);
        this.nameControl.setValue(this.item.name);
        this.buttonAction = this.onUpdate.bind(this);
        this.buttonLabel = 'Actualizar';
      } else {
        this.transactionType = data.data.transactionType;

        this.form.get('service_type')?.setValue(this.transactionType);
      }
    });

    this.colorControl.valueChanges.subscribe((value) => {
      this.validate();
    });

    this.iconControl.valueChanges.subscribe((value) => {
      this.validate();
    });

    this.nameControl.valueChanges.subscribe((value) => {
      this.validate();
    });
  }

  validate() {
    this.buttonDisabled =
      !this.colorControl.value ||
      !this.iconControl.value ||
      !this.nameControl.value;
  }

  onSave() {
    this.categorySvc.create(this.form.value).subscribe(
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

  onUpdate() {
    this.categorySvc.update(this.item.id, this.form.value).subscribe(
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
