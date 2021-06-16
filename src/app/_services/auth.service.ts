import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isLoggedIn(): boolean {
    this.authToken = localStorage.getItem('token');
    return (this.authToken !== null) ? true : false;
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService
  ) {
    this.userLoggedIn.next(false);
   }


  private userLoggedIn = new Subject<boolean>();
  user: any;
  authToken: any;


  // Http Options
  httpOptions = {
    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })
  };


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

  login(data: any): Observable<any> {
    return this.http
      .post<any>(`${environment.url}/auth/login`, data, this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  reset(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/auth/reset`, data, this.httpOptions
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  checkMail(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/auth/check-mail`, data, this.httpOptions
    ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url}/auth/register`, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  setUser(resp: any) {
    localStorage.setItem('token', resp.token);
    const params = this.route.snapshot.queryParams;
    this.router.navigate(['users']);

}

decode() {

  return helper.decodeToken(localStorage.getItem('token'));

}
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  this.router.navigate(['/login']);

}

}
