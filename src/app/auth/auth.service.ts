import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

import 'rxjs/add/operator/map';

export interface UserInfo {
  uid: string;
  accessToken?: string;
  email: string;
  name: string;
  photoUrl: string;
}

@Injectable()
export class AuthService {

  constructor(private af: AngularFire) { }

  login(): Promise<FirebaseAuthState> {
    return new Promise(() => this.af.auth.login());
  }

  logout(): void {
    this.af.auth.logout().then(() => window.location.reload());
  }

  isLoggedIn(): Observable<boolean> {
    return this.af.auth.map(state => state && !state.anonymous);
  }

  getUserInfo(): Observable<UserInfo> {
    return this.af.auth.map(state => {
      if (state && !state.anonymous) {
        return {
          uid: state.uid,
          accessToken: (state.github as any).accessToken,
          email: state.auth.email || state.github.email,
          name: state.auth.displayName || state.github.displayName,
          photoUrl: state.auth.photoURL || state.github.photoURL
        };
      }
      return undefined;
    });
  }
}
