import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsUserProfileInfoComponent } from './cms-user-profile-info.component';
import { CmsUserProfileInfoRoutingModule } from './cms-user-profile-info-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsUserProfileInfoRoutingModule
  ],
  declarations: [CmsUserProfileInfoComponent],
  exports: [CmsUserProfileInfoComponent],
  entryComponents: [],
  schemas: []
})
export class CmsUserProfileInfoModule {
}
