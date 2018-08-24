import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule, MatExpansionModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';

import { ManuscriptReviewFormComponent } from './manuscript-review-form.component';

import { SharedAppFileUploadModule } from '@app/fileUpload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule, MatExpansionModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule,
    SharedAppFileUploadModule,
  ],
  declarations: [ManuscriptReviewFormComponent],
  exports: [ManuscriptReviewFormComponent],
  entryComponents: [],
  schemas: [],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'zh-CN'
    }
  ]
})
export class ManuscriptReviewFormModule {
}
