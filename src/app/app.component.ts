import { Component, ErrorHandler } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HomeService } from './pages/home/home.service';

const LOADINGCHART=`
<svg xmlns="http://www.w3.org/2000/svg" class="logomark" width="64" height="48" viewBox="0 0 64 48">
    <style>
    .logomark .aqua {
        fill: #55b4c8;
    }

    .logomark .orange {
        fill: #ff8c00;
    }

    .logomark .red {
        fill: #f00;
    }

    .logomark .grey {
        fill: #b4bebe;
    }

    rect {
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-play-state: paused;
    }

    rect[class*='right'] {
        animation-name: logo-mark-bounce-right;
        animation-duration: 1.25s;
        animation-play-state: running;
    }

    rect[class*='left'] {
        animation-name: logo-mark-bounce-left;
        animation-duration: 1.25s;
        animation-play-state: running;
    }

    .right-2 {
        animation-delay: calc(1.25s / 6);
    }

    .right-3 {
        animation-delay: calc(1.25s / 6 * 2);
    }

    .left-3 {
        animation-delay: calc(1.25s / 6 * 3);
    }

    .left-2 {
        animation-delay: calc(1.25s / 6 * 4);
    }

    .left-1 {
        animation-delay: calc(1.25s / 6 * 5);
    }

    @keyframes logo-mark-bounce-right {
        0% {
        transform: translateX(0%);
        }

        16.6666% {
        transform: translateX(3px);
        }

        33.3333% {
        transform: translateX(0);
        }
    }

    @keyframes logo-mark-bounce-left {
        0% {
        transform: translateX(0%);
        }

        16.6666% {
        transform: translateX(-3px);
        }

        33.3333% {
        transform: translateX(0);
        }
    }
    </style>
  
    <rect class="aqua right-1" x="51" y="10" width="7" height="8"/>
    <path class="aqua right-1" d="M58,10l-17,0l-8,8l25,0l0,-8Z"/>
    <rect class="orange right-2" x="36" y="22" width="7" height="8"/>
    <path class="orange right-2" d="M43,30l0,-7.995l-14,-0l-8.008,7.995l22.008,0Z"/>
    <rect class="red right-3" x="24" y="34" width="7" height="8"/>
    <path class="red right-3" d="M13,38.01l4,-4.01l14,0l0,8l-18,0l0,-3.99Z"/>

    <rect class="grey left-1" x="11" y="6" width="7" height="8"/>
    <path class="grey left-1" d="M41,10l-4,4l-26,0l0,-8l30,0l0,4Z"/>
    <rect class="grey left-2" x="16" y="18" width="7" height="8"/>
    <path class="grey left-2" d="M16,26l9,0l8,-8l-17,-0l0,8Z"/>
    <rect class="grey left-3" x="6" y="30" width="7" height="8"/>
    <path class="grey left-3" d="M6,37.988l7,0.012l7.992,-8l-14.992,-0.047l-0,8.035Z"/>
</svg>`

const formFieldAppearance = {
    appearance: 'outline',
    // panelClass: ['color-text-gris2'],
  };
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    HomeService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: formFieldAppearance },
  ],
})
export class AppComponent {
  title = 'front_sentiment_tube';
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'loadingChart',
      sanitizer.bypassSecurityTrustHtml(LOADINGCHART)
    );
  }
}
