import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [LoginComponent, UserMenuComponent],
  exports: [UserMenuComponent],
  providers: [AuthGuard, AuthService],
  entryComponents: [LoginComponent]
})
export class AuthModule { }
