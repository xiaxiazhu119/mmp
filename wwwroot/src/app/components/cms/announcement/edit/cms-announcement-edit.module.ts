import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsAnnouncementEditRoutingModule } from './cms-announcement-edit-routing.module';
import { CmsAnnouncementEditComponent } from './cms-announcement-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsAnnouncementEditRoutingModule
  ],
  declarations: [CmsAnnouncementEditComponent],
  exports: [CmsAnnouncementEditComponent],
  entryComponents: [],
  schemas: []
})
export class CmsAnnouncementEditModule {
}
