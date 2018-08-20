import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsManuscriptInfoRoutingModule } from './cms-manuscript-info-routing.module';
import { CmsManuscriptInfoComponent } from './cms-manuscript-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsManuscriptInfoRoutingModule
  ],
  declarations: [CmsManuscriptInfoComponent],
  exports: [CmsManuscriptInfoComponent],
  entryComponents: [],
  schemas: []
})
export class CmsManuscriptInfoModule {
}
