import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatButtonModule, MatCheckboxModule, MatDialogModule } from '@angular/material';

import { CmsManuscriptConfirmDialogComponent } from './cms-manuscript-confirm-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatCheckboxModule, MatDialogModule,
  ],
  declarations: [CmsManuscriptConfirmDialogComponent],
  exports: [CmsManuscriptConfirmDialogComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsManuscriptConfirmDialogModule {
}
