import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService {

  constructor(
    private auth: AuthService,
    public toast: ToastController
  ) { }

  async notify() {
    const toast = await this.toast.create({
      message: 'Your token has expired!',
      duration: 2000
    });
    toast.present();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(
        (err, caught ) => {
          if ( err.status === 401){
            this.handleAuthError();
            this.notify();
            return of(err);
          }
          throw err;
        }
      )
    );
  }




  private handleAuthError(){
    this.auth.logout();

  }
}
