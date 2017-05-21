import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';

import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoryComponent } from './repository/repository.component';

const routes: Routes = [
  { path: ':owner/:repo', component: RepositoryComponent, canActivate: [AuthGuard] },
  { path: ':owner/:repo/pages/:path', component: PageComponent, canActivate: [AuthGuard] },
  { path: ':owner/:repo/posts/:path', component: PostComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthModule],
  exports: [RouterModule]
})
export class ExplorerRoutingModule { }
