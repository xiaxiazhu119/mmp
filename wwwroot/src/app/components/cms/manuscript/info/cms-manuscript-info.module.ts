import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatButtonModule, MatSnackBarModule } from '@angular/material';

import { CmsManuscriptInfoRoutingModule } from './cms-manuscript-info-routing.module';
import { CmsManuscriptInfoComponent } from './cms-manuscript-info.component';

import { ManuscriptInfoModule } from '../../_manuscript/info/manuscript-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatSnackBarModule,
    ManuscriptInfoModule,
    CmsManuscriptInfoRoutingModule
  ],
  declarations: [CmsManuscriptInfoComponent],
  exports: [CmsManuscriptInfoComponent],
  entryComponents: [],
  schemas: []
})
export class CmsManuscriptInfoModule {
}
