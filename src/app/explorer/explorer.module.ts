import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorerRoutingModule } from './explorer-routing.module';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoryComponent } from './repository/repository.component';

@NgModule({
  imports: [
    CommonModule,
    ExplorerRoutingModule
  ],
  declarations: [RepositoriesComponent, RepositoryComponent]
})
export class ExplorerModule { }
