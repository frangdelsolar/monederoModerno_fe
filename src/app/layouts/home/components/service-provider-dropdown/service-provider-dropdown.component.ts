import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServiceProviderService } from '@app/core/controllers/service-provider.controller';
import { DeductionFormService } from '@app/core/services/deduction-form.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-service-provider-dropdown',
  templateUrl: './service-provider-dropdown.component.html',
  styleUrls: ['./service-provider-dropdown.component.scss'],
})
export class ServiceProviderDropdownComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';
  @Input() serviceProviderControl: FormControl = new FormControl(null, []);

  addNewForm: boolean = false;
  addNewIcon: string = 'pi pi-plus';

  labelForNewServiceProviderControl: string = 'Nuevo proveedor';
  newServiceProviderControl: FormControl = new FormControl(null, []);

  items: any[] = [];

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private serviceProviderSvc: ServiceProviderService,
    private deductionFormSvc: DeductionFormService
  ) {
    this.loadServices();

    this.deductionFormSvc.SaveServiceProviderSignal.subscribe(
      (save: boolean) => {
        if (save) {
          this.validateAndSave();
        }
      }
    );
  }

  ngOnInit(): void {}

  loadServices() {
    this.loading.next(true);

    this.serviceProviderSvc.getAll().subscribe((items: any) => {
      this.items = items;
      this.loading.next(false);
    });
  }

  onAddNewClick() {
    this.addNewForm = !this.addNewForm;
    this.addNewIcon = this.addNewForm ? 'pi pi-minus' : 'pi pi-plus';
    if (!this.addNewForm) {
      this.newServiceProviderControl.reset();
    }
    this.serviceProviderControl.reset();
  }

  validateAndSave() {
    if (
      this.serviceProviderControl.value == null &&
      this.newServiceProviderControl.value == null
    ) {
      let errorMsg = 'Debes seleccionar o agregar un proveedor';
      this.serviceProviderControl.markAsDirty();
      this.serviceProviderControl.markAsTouched();
      this.newServiceProviderControl.markAsDirty();
      this.newServiceProviderControl.markAsTouched();
      this.newServiceProviderControl.setErrors({
        serverError: errorMsg,
      });
      this.serviceProviderControl.setErrors({
        serverError: errorMsg,
      });
      this.deductionFormSvc.pushError({
        step: 'service',
        error: errorMsg,
      });
    }

    if (
      this.serviceProviderControl.value == null &&
      this.newServiceProviderControl.value != null
    ) {
      this.saveNew();
    }
    this.returnServiceValue();
  }

  returnServiceValue() {
    this.deductionFormSvc.serviceProviderOk(
      this.serviceProviderControl.value.id
    );
  }

  saveNew() {
    this.serviceProviderSvc
      .create({
        name: this.newServiceProviderControl.value,
      })
      .subscribe(
        (service) => {
          this.items.push(service);
          this.serviceProviderControl.setValue(service);
          this.addNewForm = false;
          this.newServiceProviderControl.reset();
          this.addNewIcon = 'pi pi-plus';
          this.returnServiceValue();
        },
        (error) => {
          if ('errors' in error.error) {
            error.error.errors.forEach((element: any) => {
              this.newServiceProviderControl.setErrors({
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
