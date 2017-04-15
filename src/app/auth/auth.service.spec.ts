import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let sut: AuthService;

  beforeEach(() => {
    sut = new AuthService(null);
  });

  xit('should return false when not logged in', () => {
    sut.isLoggedIn().subscribe(status => expect(status).toBeFalsy());
  });

  xit('should return true when logged in', () => {
    // Mock AngularFire.auth to return true
    sut.isLoggedIn().subscribe(status => expect(status).toBeTruthy());
  });

  xit('should call login on AngularFire when login called', () => {});
  xit('should call logout on AngularFire when logout called', () => {});
  xit('should return the user object from AngularFire', () => {});
  xit('should cache the GitHub access token', () => {});
});
