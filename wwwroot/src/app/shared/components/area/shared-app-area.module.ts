import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule, MatButtonModule, MatSnackBarModule } from '@angular/material';

import { SharedAppAreaComponent } from './shared-app-area.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatSelectModule, MatButtonModule, MatSnackBarModule,
  ],
  declarations: [SharedAppAreaComponent],
  exports: [SharedAppAreaComponent],
  entryComponents: [],
  schemas: []
})
export class SharedAppAreaModule {
}
