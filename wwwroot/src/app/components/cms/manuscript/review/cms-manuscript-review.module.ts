import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule, MatExpansionModule, MatRadioModule } from '@angular/material';

import { CmsManuscriptReviewRoutingModule } from './cms-manuscript-review-routing.module';
import { CmsManuscriptReviewComponent } from './cms-manuscript-review.component';

import { ManuscriptEditFormModule } from '../../_manuscript/edit/manuscript-edit-form.module';
import { ManuscriptReviewFormModule } from '../../_manuscript/review/manuscript-review-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule, MatExpansionModule, MatRadioModule,
    ManuscriptEditFormModule, ManuscriptReviewFormModule,
    CmsManuscriptReviewRoutingModule
  ],
  declarations: [CmsManuscriptReviewComponent],
  exports: [CmsManuscriptReviewComponent],
  entryComponents: [],
  schemas: []
})
export class CmsManuscriptReviewModule {
}
