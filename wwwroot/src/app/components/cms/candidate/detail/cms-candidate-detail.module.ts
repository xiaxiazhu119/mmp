import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsCandidateDetailRoutingModule } from './cms-candidate-detail-routing.module';
import { CmsCandidateDetailComponent } from './cms-candidate-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsCandidateDetailRoutingModule
  ],
  declarations: [CmsCandidateDetailComponent],
  exports: [CmsCandidateDetailComponent],
  entryComponents: [],
  schemas: []
})
export class CmsCandidateDetailModule {
}
