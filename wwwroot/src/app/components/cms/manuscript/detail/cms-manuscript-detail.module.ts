import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsManuscriptDetailRoutingModule } from './cms-manuscript-detail-routing.module';
import { CmsManuscriptDetailComponent } from './cms-manuscript-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsManuscriptDetailRoutingModule
  ],
  declarations: [CmsManuscriptDetailComponent],
  exports: [CmsManuscriptDetailComponent],
  entryComponents: [],
  schemas: []
})
export class CmsManuscriptDetailModule {
}
