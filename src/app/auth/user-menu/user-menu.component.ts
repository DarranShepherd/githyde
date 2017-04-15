import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';

@Component({
  selector: 'gh-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

  get isLoggedIn(): Observable<boolean> {
    return this.auth.isLoggedIn();
  }
  get name(): Observable<string> {
    return this.auth.getUserInfo().map(info => info.name);
  }
  get photoUrl(): Observable<string> {
    return this.auth.getUserInfo().map(info => info.photoUrl);
  }
}
