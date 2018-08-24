import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';

import { CmsUserProfileComponent } from './cms-user-profile.component';
import { CmsUserProfileRoutingModule } from './cms-user-profile-routing.module';

import { UserInfoModule } from '../_info/user-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule,
    UserInfoModule,
    CmsUserProfileRoutingModule
  ],
  declarations: [CmsUserProfileComponent],
  exports: [CmsUserProfileComponent],
  entryComponents: [],
  schemas: []
})
export class CmsUserProfileModule {
}
