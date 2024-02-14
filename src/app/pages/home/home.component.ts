import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ErrorHandler, Signal, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { SimpleDoughnutComponent } from '../../components/SimpleDoughnut/SimpleDoughnut.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { getData, getData2, getData3 } from "../../components/SimpleDoughnut/data";
import { AgChartOptions } from 'ag-charts-community';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { LoadingChartComponent } from '../../components/loading-chart/loading-chart.component';
import { OPTIONS_COMMENTS, OPTIONS_NEGATIVE, OPTIONS_POSITIVE } from './home.constants';
import { Subscription, timer } from 'rxjs';
import { InterceptorStateService } from '../../services/interceptor-state.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { youtubeLinkValidator } from '../../helpers/validator-youtube';
import { isValidField, getFieldErrors } from '../notFound/validateForms';
import { HomeService } from './home.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DistributionComments, responseSentientsComments } from './home.interface';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,

    SimpleDoughnutComponent,
    LoadingChartComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    HomeService,
  ]
})
export default class HomeComponent {

  form: FormGroup = this.fb.group({
    link: ['', [youtubeLinkValidator]],
  });

  private subscriptionLoading!: Subscription;

  public isLoading = signal<boolean>(false);

  public numberColsGraph= signal<number>(3);
  public rowHeightGraph=signal<string>('2:1');

  public optionsComments = signal<AgChartOptions>({});
  public optionsPositive = signal<AgChartOptions>({});
  public optionsNegative = signal<AgChartOptions>({});

  private optionsCommentsBefore= OPTIONS_COMMENTS;

  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackbarService,
    private interceptorStateService: InterceptorStateService,
    private homeService: HomeService,
  ) {
    // this.optionsComments = OPTIONS_COMMENTS;
    // this.optionsPositive = OPTIONS_POSITIVE;
    // this.optionsNegative = OPTIONS_NEGATIVE;
  }

  ngOnInit() {
    this.subscriptionLoading = this.interceptorStateService.loading$.subscribe((loading: boolean) => {
      this.isLoading.update((value) => value = loading);
    });
  }




  onSubmit(): void {
    if(this.form.invalid) return;
    const link = this.form.value.link;
    this.snackBarService.showSuccess(`Link: ${link}`);
    this.getSentimentComments(link);
    // this.getAnaysisMock(link);
    this.form.reset();
    this.snackBarService.showSuccess('Analizando...');
    // this.isLoading.update((value) => value = true);
    // timer(4000).subscribe(() => {
    //   this.isLoading.update((value) => value = false);
    //   this.optionsComments.update((value) => value = OPTIONS_COMMENTS);
    //   this.optionsPositive.update((value) => value = OPTIONS_POSITIVE);
    //   this.optionsNegative.update((value) => value = OPTIONS_NEGATIVE);
    // });
  }

  private getSentimentComments(link: string) {
    this.homeService.getSentimentComments(link).subscribe({
      next: (response) => {
        if(!response) return this.snackBarService.show('No se ha podido obtener el analisis');
        //cambiamos data de optionsComments
        console.log(response);
        // actualizamos el parametro data de optionsComments
        this.optionsCommentsBefore.data = response;
        this.optionsComments.update((value) => value = this.optionsCommentsBefore);
        // ahora actualizamos el campo data de optionsComments
        
      },
      error: (message) => {
        this.snackBarService.show(message);
      }
    });
  }

  private getAnaysisMock(link: string) {
    this.isLoading.update((value) => value = true);
    timer(4000).subscribe(() => {
      this.isLoading.update((value) => value = false);
      this.optionsComments.update((value) => value = OPTIONS_COMMENTS);
      this.optionsPositive.update((value) => value = OPTIONS_POSITIVE);
      this.optionsNegative.update((value) => value = OPTIONS_NEGATIVE);
    });
  }

  isValidField(field: string,fg: FormGroup): boolean | null {
    return isValidField(field, fg);
  }

  getFieldErrors(field: string,fg: FormGroup): string | null{
    return getFieldErrors(field, fg);
  }

}
