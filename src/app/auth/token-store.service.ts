import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class TokenStoreService {
  private _token: string;

  constructor(private af: AngularFireAuth) {
    af.auth.getRedirectResult().then(result => this.onRedirectResult(result));
    af.authState.subscribe(user => this.onNewUser(user));
  }

  get token(): string { return this._token; }

  onNewUser(user: firebase.User): void {
    if (user && !user.isAnonymous) {
      this._token = window.sessionStorage.getItem(`github.token.${user.uid}`);
    }
  }

  onRedirectResult(result: any): void {
    if (!result || !result.credential) { return; }
    this._token = result.credential.accessToken;
    window.sessionStorage.setItem(`github.token.${result.user.uid}`, this._token);
  }
}
