import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService,
    private dialog: MdDialog) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth
      .isLoggedIn()
      .do(x => { if (!x) { this.dialog.open(LoginComponent); } });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(next, state);
  }
}
