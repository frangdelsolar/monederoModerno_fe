import { Component, OnInit } from '@angular/core';
import { TaskService } from '@app/core/controllers/task-controller.service copy';
import { Task } from '@app/core/models/task.interface';
import { MonthSelectorService } from '@app/core/services/month-selector.service';
@Component({
  selector: 'app-task-widget',
  templateUrl: './task-widget.component.html',
  styleUrls: ['./task-widget.component.scss'],
})
export class TaskWidgetComponent implements OnInit {
  items: Task[];
  today = new Date();
  month: number = this.today.getMonth() + 1;
  year: number = this.today.getFullYear();

  constructor(
    private taskSvc: TaskService,
    private monthSelectorSvc: MonthSelectorService
  ) {}

  ngOnInit(): void {
    this.getTasks();

    this.monthSelectorSvc.dateControl.valueChanges.subscribe((value) => {
      this.month = value.getMonth() + 1;
      this.year = value.getFullYear();
      this.getTasks();
    });
  }

  getTasks() {
    let params = {
      month: this.month,
      year: this.year,
    };
    this.taskSvc.getAll(params).subscribe((res: any) => {
      this.items = res;
    });
  }
}
