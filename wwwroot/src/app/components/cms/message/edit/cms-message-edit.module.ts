import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsMessageEditRoutingModule } from './cms-message-edit-routing.module';
import { CmsMessageEditComponent } from './cms-message-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsMessageEditRoutingModule
  ],
  declarations: [CmsMessageEditComponent],
  exports: [CmsMessageEditComponent],
  entryComponents: [],
  schemas: []
})
export class CmsMessageEditModule {
}
