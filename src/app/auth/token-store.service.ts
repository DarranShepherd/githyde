import { Injectable } from '@angular/core';

import { FirebaseAuthState } from 'angularfire2';

@Injectable()
export class TokenStoreService {
  private _token: string;

  get token(): string { return this._token; }

  onNewAuthState(state: FirebaseAuthState) {
    if (!state) { return; }

    if (state && state.github && (<any>state.github).accessToken) {
      this._token = (<any>state.github).accessToken;
      window.sessionStorage.setItem(`github.token.${state.uid}`, this._token);
    } else {
      this._token = window.sessionStorage.getItem(`github.token.${state.uid}`);
    }
  }

}
