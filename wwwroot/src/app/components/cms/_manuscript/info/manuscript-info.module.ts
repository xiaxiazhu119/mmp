import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManuscriptInfoComponent } from './manuscript-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [ManuscriptInfoComponent],
  exports: [ManuscriptInfoComponent],
  entryComponents: [],
  schemas: []
})
export class ManuscriptInfoModule {
}
