import { TestBed, async, inject } from '@angular/core/testing';
import { RouterStateSnapshot } from '@angular/router';
import { MdDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

describe('AuthGuard', () => {
  beforeEach(() => {
    const isLoggedIn = new BehaviorSubject(false);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService, useValue: {
            isLoggedIn: () => isLoggedIn.asObservable(),
            setIsLoggedIn: state => isLoggedIn.next(state)
          }
        },
        { provide: MdDialog, useValue: {
          open: jasmine.createSpy('open')
        } },
        { provide: RouterStateSnapshot, useValue: {} }
      ]
    });
  });

  it('should return true if authenticated', inject([AuthGuard, AuthService], (guard: AuthGuard, auth: any) => {
    auth.setIsLoggedIn(true);
    let canActivate = false;
    guard.canActivate(undefined, undefined).subscribe(output => canActivate = output);
    expect(canActivate).toBeTruthy();
  }));

  it('should open the login dialog if not authenticated', inject(
      [AuthGuard, AuthService, MdDialog],
      (guard: AuthGuard, auth: any, mdDialog: any) => {
    auth.setIsLoggedIn(false);
    guard.canActivate(undefined, undefined).subscribe(() => {});
    expect(mdDialog.open).toHaveBeenCalledWith(LoginComponent);
  }));
});
