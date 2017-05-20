import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';

@Component({
  selector: 'gh-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  isLoggedIn: boolean;
  name: string;
  photoUrl: string;

  constructor(private auth: AuthService) {
    this.auth.isLoggedIn().subscribe(state => this.isLoggedIn = state);
    this.auth.getUserInfo().filter(info => !!info).subscribe(info => {
      this.name = info.name;
      this.photoUrl = info.photoUrl;
    });
  }

  logout() {
    this.auth.logout();
  }
}
