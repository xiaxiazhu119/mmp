import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { CmsManuscriptListRoutingModule } from './cms-manuscript-list-routing.module';
import { CmsManuscriptListComponent } from './cms-manuscript-list.component';

import { CmsManuscriptConfirmDialogModule } from './dialog/confirm/cms-manuscript-confirm-dialog.module';
import { CmsManuscriptConfirmDialogComponent } from './dialog/confirm/cms-manuscript-confirm-dialog.component';

import { ManuscriptListOperationModule } from './operation/manuscript-list-operation.module';

import { AppPaginationModule } from '@app/pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    AppPaginationModule,
    ManuscriptListOperationModule, CmsManuscriptConfirmDialogModule,
    CmsManuscriptListRoutingModule
  ],
  declarations: [CmsManuscriptListComponent],
  exports: [CmsManuscriptListComponent],
  entryComponents: [CmsManuscriptConfirmDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsManuscriptListModule {
}
