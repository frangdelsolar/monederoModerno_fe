import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskWidgetComponent } from './components/task-widget/task-widget.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    TaskComponent,
    TaskTableComponent,
    TaskFormComponent,
    TaskItemComponent,
    TaskListComponent,
    TaskWidgetComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [SharedModule, TaskWidgetComponent],
})
export class TaskModule {}
