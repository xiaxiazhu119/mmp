import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatSnackBarModule } from '@angular/material';

import { CmsMessageInfoRoutingModule } from './cms-message-info-routing.module';
import { CmsMessageInfoComponent } from './cms-message-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule, MatSnackBarModule,
    CmsMessageInfoRoutingModule
  ],
  declarations: [CmsMessageInfoComponent],
  exports: [CmsMessageInfoComponent],
  entryComponents: [],
  schemas: []
})
export class CmsMessageInfoModule {
}
