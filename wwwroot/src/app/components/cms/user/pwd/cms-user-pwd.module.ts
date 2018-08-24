import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatButtonModule, MatSnackBarModule } from '@angular/material';

import { CmsUserPwdComponent } from './cms-user-pwd.component';
import { CmsUserPwdRoutingModule } from './cms-user-pwd-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatSnackBarModule,
    CmsUserPwdRoutingModule
  ],
  declarations: [CmsUserPwdComponent],
  exports: [CmsUserPwdComponent],
  entryComponents: [],
  schemas: []
})
export class CmsUserPwdModule {
}
