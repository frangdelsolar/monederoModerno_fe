import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from '@app/core/models/task.interface';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit {
  @Input() tasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {}

  getControl(status: boolean) {
    return new FormControl(status, []);
  }
}
