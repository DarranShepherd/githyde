import { Injectable } from '@angular/core';

import { AuthService, UserInfo } from './auth.service';

@Injectable()
export class TokenStoreService {
  private _token: string;

  constructor(auth: AuthService) {
    auth.getUserInfo().subscribe(userInfo => this.onNewUserInfo(userInfo));
  }

  get token(): string { return this._token; }

  private onNewUserInfo(userInfo: UserInfo) {
    if (userInfo && userInfo.uid) {
      if (userInfo.accessToken) {
        this._token = userInfo.accessToken;
        window.sessionStorage.setItem(`github.token.${userInfo.uid}`, userInfo.accessToken);
      } else {
        this._token = window.sessionStorage.getItem(`github.token.${userInfo.uid}`);
      }
    }
  }

}
