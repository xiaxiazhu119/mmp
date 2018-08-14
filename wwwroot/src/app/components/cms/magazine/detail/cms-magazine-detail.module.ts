import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsMagazineDetailRoutingModule } from './cms-magazine-detail-routing.module';
import { CmsMagazineDetailComponent } from './cms-magazine-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsMagazineDetailRoutingModule
  ],
  declarations: [CmsMagazineDetailComponent],
  exports: [CmsMagazineDetailComponent],
  entryComponents: [],
  schemas: []
})
export class CmsMagazineDetailModule {
}
