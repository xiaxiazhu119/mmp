import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule, MatExpansionModule, MatRadioModule } from '@angular/material';

import { CmsManuscriptEditRoutingModule } from './cms-manuscript-edit-routing.module';
import { CmsManuscriptEditComponent } from './cms-manuscript-edit.component';

import { ManuscriptEditFormModule } from '../../_manuscript/edit/manuscript-edit-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule, MatExpansionModule, MatRadioModule,
    ManuscriptEditFormModule,
    CmsManuscriptEditRoutingModule,
  ],
  declarations: [CmsManuscriptEditComponent],
  exports: [CmsManuscriptEditComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsManuscriptEditModule {
}
