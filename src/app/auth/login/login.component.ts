import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { AuthService } from '../auth.service';

@Component({
  selector: 'gh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private auth: AuthService,
    private dialogRef: MdDialogRef<LoginComponent>) { }

  login(): void {
    this.auth.login();
    this.dialogRef.close();
  }
}
