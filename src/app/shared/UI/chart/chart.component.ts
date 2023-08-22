import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() chartId = 'myChart' + Math.random().toFixed(2).toString();
  @Input() chartCtx: Observable<any> = new Observable<any>();
  chart: Chart;
  context: any;

  dataReady: boolean = false;
  renderReady: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.chartCtx.subscribe((res: any) => {
      if (res) {
        this.context = res;
        this.dataReady = true;
        this.createChart();
      }
    });
  }

  ngAfterViewInit(): void {
    this.renderReady = true;
    this.createChart();
  }

  createChart() {
    if (!this.dataReady || !this.renderReady) return;
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.chartId, this.context);
  }
}
