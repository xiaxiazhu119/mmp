import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsCandidateInfoRoutingModule } from './cms-candidate-info-routing.module';
import { CmsCandidateInfoComponent } from './cms-candidate-info.component';

import { ManuscriptInfoModule } from '../../_manuscript/info/manuscript-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    ManuscriptInfoModule,
    CmsCandidateInfoRoutingModule
  ],
  declarations: [CmsCandidateInfoComponent],
  exports: [CmsCandidateInfoComponent],
  entryComponents: [],
  schemas: []
})
export class CmsCandidateInfoModule {
}
