import { AuthService } from './_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.decode();
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['/login']);
      return false;
    }

    else {
      return true;
    };

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.decode();
    //console.log("this: ", user, next);
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['/login']);
      return false;
    }
  else {
    return true;
  }

  }






}
