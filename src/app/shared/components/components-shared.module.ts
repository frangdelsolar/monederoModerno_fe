import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeductionTypeDropdownComponent } from './deduction-type-dropdown/deduction-type-dropdown.component';
import { ServiceDropdownComponent } from './service-dropdown/service-dropdown.component';
import { ServiceProviderDropdownComponent } from './service-provider-dropdown/service-provider-dropdown.component';
import { UIModule } from '../UI/ui.module';

const components = [
  DeductionTypeDropdownComponent,
  ServiceDropdownComponent,
  ServiceProviderDropdownComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, UIModule],
  exports: [...components],
})
export class ComponentsSharedModule {}
