import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsUserProfilePwdComponent } from './cms-user-profile-pwd.component';
import { CmsUserProfilePwdRoutingModule } from './cms-user-profile-pwd-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsUserProfilePwdRoutingModule
  ],
  declarations: [CmsUserProfilePwdComponent],
  exports: [CmsUserProfilePwdComponent],
  entryComponents: [],
  schemas: []
})
export class CmsUserProfilePwdModule {
}
