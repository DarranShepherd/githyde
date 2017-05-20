import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'gh-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private auth: AuthService) {
    this.auth.isLoggedIn().subscribe(state => this.isLoggedIn = state);
  }

  ngOnInit() {
  }

}
