import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryWidgetComponent } from './category-widget/category-widget.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryItemComponent,
    CategoryListComponent,
    CategoryWidgetComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [SharedModule, CategoryWidgetComponent],
})
export class CategoryModule {}
