import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, } from '@angular/material';

import { CmsMagazineListRoutingModule } from './cms-magazine-list-routing.module';
import { CmsMagazineListComponent } from './cms-magazine-list.component';

import { AppPaginationModule } from '@app/pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule,
    AppPaginationModule,
    CmsMagazineListRoutingModule
  ],
  declarations: [CmsMagazineListComponent],
  exports: [CmsMagazineListComponent],
  entryComponents: [],
  schemas: []
})
export class CmsMagazineListModule {
}
