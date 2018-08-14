import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsCandidateListRoutingModule } from './cms-candidate-list-routing.module';
import { CmsCandidateListComponent } from './cms-candidate-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsCandidateListRoutingModule
  ],
  declarations: [CmsCandidateListComponent],
  exports: [CmsCandidateListComponent],
  entryComponents: [],
  schemas: []
})
export class CmsCandidateListModule {
}
