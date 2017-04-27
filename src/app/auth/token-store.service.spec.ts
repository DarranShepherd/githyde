import { TestBed, inject } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';
import { TokenStoreService } from './token-store.service';

describe('TokenStoreService', () => {
  const userInfo = new BehaviorSubject(false);
  let setItemSpy, getItemSpy;

  beforeEach(() => {
    getItemSpy = spyOn(window.sessionStorage, 'getItem');
    setItemSpy = spyOn(window.sessionStorage, 'setItem');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenStoreService,
        {
          provide: AngularFireAuth, useValue: {
            auth: {
              getRedirectResult: () => new Promise(() => {})
            },
            authState: Observable.of(false)
          }
        }
      ]
    });
  });

  it('should check for token in session storage when user logs in', inject([TokenStoreService], (service: TokenStoreService) => {
    // TestBed.get(AuthService).setUserInfo({ uid: '123' });
    service.onNewUser({isAnonymous: false, uid: '123'} as firebase.User);
    expect(getItemSpy).toHaveBeenCalledWith('github.token.123');
  }));

  xit('should store token if provided by user info', inject([TokenStoreService], (service: TokenStoreService) => {
    TestBed.get(AuthService).setUserInfo({ uid: '123', accessToken: 'abc' });
    expect(setItemSpy).toHaveBeenCalledWith('github.token.123', 'abc');
  }));

  xit('should return the token from the token property', inject([TokenStoreService], (service: TokenStoreService) => {
    TestBed.get(AuthService).setUserInfo({ uid: '123', accessToken: 'def' });
    expect(service.token).toEqual('def');
  }));
});
