import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-totals-details',
  templateUrl: './totals-details.component.html',
  styleUrls: ['./totals-details.component.scss'],
})
export class TotalsDetailsComponent implements OnInit {
  @Input() chartData: any;
  incomeData: any = {};
  expenseData: any = {};
  executed: any = [];
  projected: any = [];
  labels: string[] = [];

  public chart: any;

  constructor() {}

  ngOnInit(): void {
    this.chartData.subscribe((res: any) => {
      if (res) {
        this.labels = res.labels;
        this.incomeData = res.income;
        this.expenseData = res.expenses;
        this.executed = res.executed_progression;
        this.projected = res.projected_progression;
        this.createChart();
      }
    });
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('MyChart', {
      data: {
        labels: this.labels,
        datasets: [
          {
            type: 'line',
            label: 'Ejecucion',
            data: this.executed,
            borderColor: 'blue',
            backgroundColor: 'blue',
            tension: 0.4,
            pointStyle: 'dash',
            pointRadius: 0,
            order: 0,
          },
          {
            type: 'line',
            label: 'Estimacion',
            data: this.projected,
            borderColor: 'lightgray',
            backgroundColor: 'lightgray',
            pointStyle: 'dash',
            pointRadius: 0,
            tension: 0.4,
            order: 1,
          },
          {
            type: 'bar',
            label: 'Gastos',
            data: this.expenseData.daily,
            borderColor: 'rgba(255, 99, 132, 0.5)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            order: 2,
          },
          {
            type: 'bar',
            label: 'Ingresos',
            data: this.incomeData.daily,
            borderColor: 'rgba(99, 255, 132, 0.5)',
            backgroundColor: 'rgba(99, 255, 132, 0.5)',
            order: 3,
          },
        ],
      },
      options: {
        aspectRatio: 1.3,
      },
    });
  }
}
