import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule, MatExpansionModule, MatRadioModule } from '@angular/material';

import { ManuscriptEditFormComponent } from './manuscript-edit-form.component';

import { SharedAppFileUploadModule } from '@app/fileUpload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule, MatExpansionModule, MatRadioModule,
    SharedAppFileUploadModule,
  ],
  declarations: [ManuscriptEditFormComponent],
  exports: [ManuscriptEditFormComponent],
  entryComponents: [],
  schemas: []
})
export class ManuscriptEditFormModule {
}
