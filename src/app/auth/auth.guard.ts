import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth
      .isLoggedIn()
      .do(isLoggedIn => {
        if (!isLoggedIn && !this.isHomePage(next)) {
          this.router.navigate(['/']);
        }
      });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(next, state);
  }

  private isHomePage(snapshot: ActivatedRouteSnapshot): boolean {
    return snapshot && snapshot.url && snapshot.url.length === 0;
  }
}
