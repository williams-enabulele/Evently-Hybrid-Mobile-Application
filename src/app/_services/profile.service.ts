import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ProfileService {

   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occured:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Oops! something not right, retry with correct credentials');
  }


  constructor(
    private http: HttpClient
  ) {}

  getProfile(data: any): Observable<any> {
    return this.http.get<any>(`${environment.url}/api/profile/${data}`)
      .pipe(
        catchError(this.handleError)
      );
  }


}