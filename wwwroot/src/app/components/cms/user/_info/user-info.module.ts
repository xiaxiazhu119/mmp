import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { UserInfoComponent } from './user-info.component';

import { SharedAppAreaModule } from '@app/area';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    SharedAppAreaModule
  ],
  declarations: [UserInfoComponent],
  exports: [UserInfoComponent],
  entryComponents: [],
  schemas: []
})
export class UserInfoModule {
}
