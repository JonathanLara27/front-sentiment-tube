import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorStateService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }
}
