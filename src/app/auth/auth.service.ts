import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/map';

import { TokenStoreService } from './token-store.service';

export interface UserInfo {
  uid: string;
  accessToken?: string;
  email: string;
  name: string;
  photoUrl: string;
}

@Injectable()
export class AuthService {
  constructor(private af: AngularFireAuth, private tokenStore: TokenStoreService) { }

  login(): Promise<any> {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    return new Promise(() => this.af.auth.signInWithRedirect(provider));
  }

  logout(): void {
    this.af.auth.signOut().then(() => window.location.reload());
  }

  isLoggedIn(): Observable<boolean> {
    return this.af.authState.map(state => state && !state.isAnonymous);
  }

  getUserInfo(): Observable<UserInfo> {
    return this.af.authState.map(user => {
      if (user && !user.isAnonymous) {
        return {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoUrl: user.photoURL
        };
      }
      return undefined;
    });
  }
}
