import { FormControl } from '@angular/forms';
import { DeductionFormService } from '../services/deduction-form.service';

export default function processFormControlErrors(
  step: string,
  control: FormControl,
  errorMsg: string,
  deductionSvc: DeductionFormService
) {
  deductionSvc.pushError({
    step: step,
    error: errorMsg,
  });
  control.markAsDirty();
  control.markAsTouched();
  control.setErrors({ serverError: errorMsg });
}
