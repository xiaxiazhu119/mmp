import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { CmsManuscriptEditRoutingModule } from './cms-manuscript-edit-routing.module';
import { CmsManuscriptEditComponent } from './cms-manuscript-edit.component';

import { ManuscriptEditFormModule } from '../../_manuscript/edit/manuscript-edit-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule, MatCheckboxModule,
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
