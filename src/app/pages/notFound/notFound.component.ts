import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule
  ],
  template: `
<mat-grid-list cols="1" rowHeight="2:1">
  <mat-grid-tile>
    <h1>404 Página no encontrada</h1>
  </mat-grid-tile>
</mat-grid-list>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFoundComponent { }
