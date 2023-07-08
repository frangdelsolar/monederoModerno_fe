import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DeductionFormService } from '@app/core/services/deduction-form.service';

@Component({
  selector: 'app-deduction-form',
  templateUrl: './deduction-form.component.html',
  styleUrls: ['./deduction-form.component.scss'],
})
export class DeductionFormComponent implements OnInit {
  @Input() editModeOn: boolean = true;

  startDateControl: FormControl = new FormControl(null, [Validators.required]);
  amountControl: FormControl = new FormControl(null, [Validators.required]);
  commentControl: FormControl = new FormControl('', [Validators.required]);
  frequencyControl: FormControl = new FormControl('', [Validators.required]);

  constructor(private deductionFormSvc: DeductionFormService) {}

  ngOnInit(): void {}

  onSaveClick() {
    this.deductionFormSvc.save();
  }
}
