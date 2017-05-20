import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExplorerRoutingModule } from './explorer-routing.module';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoryComponent } from './repository/repository.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ExplorerRoutingModule
  ],
  declarations: [RepositoriesComponent, RepositoryComponent],
  exports: [RepositoriesComponent]
})
export class ExplorerModule { }
