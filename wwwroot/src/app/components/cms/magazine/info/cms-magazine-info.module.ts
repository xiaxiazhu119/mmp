import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsMagazineInfoRoutingModule } from './cms-magazine-info-routing.module';
import { CmsMagazineInfoComponent } from './cms-magazine-info.component';

import { ManuscriptInfoModule } from '../../_manuscript/info/manuscript-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    ManuscriptInfoModule,
    CmsMagazineInfoRoutingModule
  ],
  declarations: [CmsMagazineInfoComponent],
  exports: [CmsMagazineInfoComponent],
  entryComponents: [],
  schemas: []
})
export class CmsMagazineInfoModule {
}
