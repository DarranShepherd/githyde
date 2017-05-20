import { TestBed, async, inject } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
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
        { provide: Router, useValue: {
          navigate: jasmine.createSpy('navigate')
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

  it('should redirect to / if not authenticated', inject(
      [AuthGuard, AuthService, Router],
      (guard: AuthGuard, auth: any, router: Router) => {
    auth.setIsLoggedIn(false);
    guard.canActivate(undefined, undefined).subscribe(() => {});
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should not redirect to / if not authenticated but already on /', inject(
      [AuthGuard, AuthService, Router],
      (guard: AuthGuard, auth: any, router: Router) => {

    const snapshot = new ActivatedRouteSnapshot();
    snapshot.url = [];
    auth.setIsLoggedIn(false);
    guard.canActivate(snapshot, undefined).subscribe(() => {});
    expect(router.navigate).not.toHaveBeenCalled();
  }));

});
