import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';

import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoryComponent } from './repository/repository.component';

const routes: Routes = [
  { path: '', component: RepositoriesComponent, canActivate: [AuthGuard] },
  { path: ':repo', component: RepositoryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthModule],
  exports: [RouterModule]
})
export class ExplorerRoutingModule { }
