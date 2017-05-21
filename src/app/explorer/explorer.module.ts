import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExplorerRoutingModule } from './explorer-routing.module';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoryComponent } from './repository/repository.component';
import { PagesComponent } from './pages/pages.component';
import { PageComponent } from './page/page.component';
import { BuildsComponent } from './builds/builds.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ExplorerRoutingModule
  ],
  declarations: [RepositoriesComponent, RepositoryComponent, PagesComponent, PageComponent, BuildsComponent, PostsComponent, PostComponent],
  exports: [RepositoriesComponent]
})
export class ExplorerModule { }
