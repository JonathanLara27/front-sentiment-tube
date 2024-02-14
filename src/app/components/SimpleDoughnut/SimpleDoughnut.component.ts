import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AgChartsAngularModule } from "ag-charts-angular";
import { AgChartOptions, AgCharts } from "ag-charts-community";

@Component({
  selector: 'app-simple-doughnut',
  standalone: true,
  imports: [
    CommonModule,
    AgChartsAngularModule,
  ],
  template: `
  <section>
    <ag-charts-angular
    style="height: 100%"
    [options]="options"/> 
  </section>
 `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleDoughnutComponent {
  @Input({required: true}) public options!: AgChartOptions;

  constructor() {
    // this.options = {
    //   data: getData(),
    //   title: {
    //     text: "TEST",
    //   },
    //   series: [
    //     {
    //       type: "pie",
    //       calloutLabelKey: "asset",
    //       angleKey: "amount",
    //       innerRadiusRatio: 0.7,
    //     },
    //   ],
    // };
  }
 }
