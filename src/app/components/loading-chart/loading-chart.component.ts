import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loading-chart',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  styleUrls: ['./loading-chart.component.scss'],
  template: `
  <div class="border-radius10 bg-white shadow-lg p-2" style="min-height: 240px;">
    <div class="d-flex justify-content-center align-items-center" style="min-height: 240px;">
        <mat-icon svgIcon="loadingChart" class="logochart"></mat-icon>
    </div>
  </div>`,
})
export class LoadingChartComponent { }
