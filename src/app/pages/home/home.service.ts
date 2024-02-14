import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map, throwError, timeout } from 'rxjs';
import { InterceptorStateService } from '../../services/interceptor-state.service';
import { environment } from '../../environments/environment.development';
import { responseSentientsComments } from './home.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private interceptorStateService: InterceptorStateService
  ) { }

  getSentimentComments(link: string) {
    const videoId = this.extractYouTubeVideoId(link);
    this.interceptorStateService.setLoading(true);
    return this.http.get<responseSentientsComments>(`${environment.url}/getSentimentComments/?link=${videoId}`).pipe(
      timeout(90000),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error)
        return throwError(() => `Error al obtener el analisis del enlace de youtube. ${JSON.stringify(error)}`);
      }),
      map((response:responseSentientsComments) => {
        // mapear asset, amount
        return [
          {
            asset: 'Comentarios positivos',
            amount: response.distribution_comments.POS
          },{
            asset: 'Comentarios negativos',
            amount: response.distribution_comments.NEG
          },{
            asset: 'Comentarios neutros',
            amount: response.distribution_comments.NEU
          }
      ]
      }),
      finalize(() => {
        this.interceptorStateService.setLoading(false);
      })
    );;
  }
  getEmotionTranscript(link: string) {
    const videoId = this.extractYouTubeVideoId(link);
    this.interceptorStateService.setLoading(true);
    return this.http.get(`${environment.url}/getEmotionTranscript/${videoId}`).pipe(
      catchError((error: ErrorEvent) => {
        return throwError(() => `Error al obtener el analisis del enlace de youtube. ${error.message}`);
      }),
      finalize(() => {
        this.interceptorStateService.setLoading(false);
      })
    );;
  }

  private extractYouTubeVideoId(link: string): string {
    // Lógica para extraer el ID del video de la URL de YouTube
    // Puedes usar expresiones regulares u otras técnicas según el formato esperado de tus URLs
    // Aquí hay un ejemplo simple asumiendo que el ID del video está después del último '=' en la URL
    const match = link.match(/=([^&]*)/);
    return match ? match[1] : '';
  }

}
