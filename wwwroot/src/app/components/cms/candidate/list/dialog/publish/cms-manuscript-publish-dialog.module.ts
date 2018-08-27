import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatButtonModule, MatSelectModule, MatDialogModule } from '@angular/material';

import { CmsManuscriptPublishDialogComponent } from './cms-manuscript-publish-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatSelectModule, MatDialogModule,
  ],
  declarations: [CmsManuscriptPublishDialogComponent],
  exports: [CmsManuscriptPublishDialogComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsManuscriptPublishDialogModule {
}
