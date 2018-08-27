import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule } from '@angular/material';

import { CmsCandidateListRoutingModule } from './cms-candidate-list-routing.module';
import { CmsCandidateListComponent } from './cms-candidate-list.component';

import { CmsManuscriptPublishDialogModule } from './dialog/publish/cms-manuscript-publish-dialog.module';
import { CmsManuscriptPublishDialogComponent } from './dialog/publish/cms-manuscript-publish-dialog.component';

import { AppPaginationModule } from '@app/pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule,
    AppPaginationModule, CmsManuscriptPublishDialogModule,
    CmsCandidateListRoutingModule
  ],
  declarations: [CmsCandidateListComponent],
  exports: [CmsCandidateListComponent],
  entryComponents: [CmsManuscriptPublishDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsCandidateListModule {
}
