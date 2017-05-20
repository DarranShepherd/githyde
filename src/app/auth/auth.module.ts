import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { TokenStoreService } from './token-store.service';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [LoginComponent, UserMenuComponent],
  exports: [LoginComponent, UserMenuComponent],
  providers: [AuthGuard, AuthService, TokenStoreService],
  entryComponents: [LoginComponent]
})
export class AuthModule { }
