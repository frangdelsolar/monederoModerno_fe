import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServiceService } from '@app/core/controllers/service.controller';
import { DeductionFormService } from '@app/core/services/deduction-form.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-service-dropdown',
  templateUrl: './service-dropdown.component.html',
  styleUrls: ['./service-dropdown.component.scss'],
})
export class ServiceDropdownComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';
  @Input() serviceControl: FormControl = new FormControl(null, []);
  @Input() serviceType: FormControl = new FormControl(null, []);

  addNewForm: boolean = false;
  addNewIcon: string = 'pi pi-plus';

  labelForNewServiceControl: string = 'Nuevo concepto';
  newServiceControl: FormControl = new FormControl(null, []);

  items: any[] = [];

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private serviceSvc: ServiceService,
    private deductionFormSvc: DeductionFormService
  ) {
    setTimeout(() => {
      this.loadServices(this.serviceType.value.value);
    }, 1000);

    this.deductionFormSvc.SaveServiceSignal.subscribe((save: boolean) => {
      if (save) {
        this.validateAndSave();
      }
    });
  }

  ngOnInit(): void {
    this.serviceType.valueChanges.subscribe((value) => {
      this.loadServices(value.value);
    });
  }

  loadServices(serviceType: string) {
    this.loading.next(true);

    this.serviceSvc.getByType(serviceType).subscribe((items: any) => {
      this.items = items;
      this.loading.next(false);
    });
  }

  onAddNewClick() {
    this.addNewForm = !this.addNewForm;
    this.addNewIcon = this.addNewForm ? 'pi pi-minus' : 'pi pi-plus';
    if (!this.addNewForm) {
      this.newServiceControl.reset();
    }
    this.serviceControl.reset();
  }

  validateAndSave() {
    if (
      this.serviceControl.value == null &&
      this.newServiceControl.value == null
    ) {
      let errorMsg = 'Debes seleccionar o agregar un servicio';
      this.serviceControl.markAsDirty();
      this.serviceControl.markAsTouched();
      this.newServiceControl.markAsDirty();
      this.newServiceControl.markAsTouched();
      this.newServiceControl.setErrors({
        serverError: errorMsg,
      });
      this.serviceControl.setErrors({
        serverError: errorMsg,
      });
      this.deductionFormSvc.pushError({
        step: 'service',
        error: errorMsg,
      });
    }

    if (
      this.serviceControl.value == null &&
      this.newServiceControl.value != null
    ) {
      this.saveNew();
    }
    this.returnServiceValue();
  }

  returnServiceValue() {
    this.deductionFormSvc.serviceOk(this.serviceControl.value.id);
  }

  saveNew() {
    this.serviceSvc
      .create({
        name: this.newServiceControl.value,
        service_type: this.serviceType.value.value,
      })
      .subscribe(
        (service) => {
          this.items.push(service);
          this.serviceControl.setValue(service);
          this.addNewForm = false;
          this.newServiceControl.reset();
          this.addNewIcon = 'pi pi-plus';
          this.returnServiceValue();
        },
        (error) => {
          if ('errors' in error.error) {
            error.error.errors.forEach((element: any) => {
              this.newServiceControl.setErrors({
                serverError: element.message,
              });
            });
          }
          this.deductionFormSvc.pushError({
            step: 'service',
            error: error.error,
          });
        }
      );
  }
}
