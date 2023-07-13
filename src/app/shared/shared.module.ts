import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from './UI/ui.module';
import { ComponentsSharedModule } from './components/components-shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UIModule, ComponentsSharedModule],
  exports: [UIModule, ComponentsSharedModule],
})
export class SharedModule {}
