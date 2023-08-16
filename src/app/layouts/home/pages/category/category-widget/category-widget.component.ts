import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-category-widget',
  templateUrl: './category-widget.component.html',
  styleUrls: ['./category-widget.component.scss'],
})
export class CategoryWidgetComponent implements OnInit {
  chart: Chart;
  inChartCtx: BehaviorSubject<any> = new BehaviorSubject({});
  exChartCtx: BehaviorSubject<any> = new BehaviorSubject({});

  @Input() data: any;

  constructor() {}

  buildContext(labels: string[], data: number[], colors: string[]) {
    return {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  }

  ngOnInit(): void {
    this.data.subscribe((res: any) => {
      if (res) {
        let in_cats = res.category_data.income.categories;
        let in_labels: any[] = [];
        let in_data: any[] = [];
        let in_colors: any[] = [];

        Object.keys(in_cats).forEach((key) => {
          let c = in_cats[key];
          in_labels.push(c.category.name);
          in_data.push(c.percentage);
          in_colors.push(c.color);
        });

        let ex_cats = res.category_data.expenses.categories;
        let ex_labels: any[] = [];
        let ex_data: any[] = [];
        let ex_colors: any[] = [];

        Object.keys(ex_cats).forEach((key) => {
          let c = ex_cats[key];
          ex_labels.push(c.category.name);
          ex_data.push(c.percentage);
          ex_colors.push(c.color);
        });

        let in_context = this.buildContext(in_labels, in_data, in_colors);
        let ex_context = this.buildContext(ex_labels, ex_data, ex_colors);

        this.inChartCtx.next(in_context);
        this.exChartCtx.next(ex_context);
      }
    });
  }
}
