import { Injectable, Injector } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private mensajeErrores: string[] =[];
  private notifier = this.injector.get(SnackbarService);

  constructor(
    private injector: Injector
  ) { }

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string | undefined {
    return error.message;
  }

  setMensajeError(mensaje: string): void {
    this.mensajeErrores.push(mensaje);
    if (!this.notifier.isSnackbarVisible()){
      this.notifier.show(mensaje);
    }
    // usamos timer de rxjs paraa borrar los mensajes luego de 2 segundos
    timer(500).subscribe(()=>this.eliminarMensajeError())
  }
  eliminarMensajeError(): void {
    this.mensajeErrores = [];
  }
  getMensajeError(): string[] {
    return this.mensajeErrores;
  }
}
