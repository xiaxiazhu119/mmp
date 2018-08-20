import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsAnnouncementInfoRoutingModule } from './cms-announcement-info-routing.module';
import { CmsAnnouncementInfoComponent } from './cms-announcement-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsAnnouncementInfoRoutingModule
  ],
  declarations: [CmsAnnouncementInfoComponent],
  exports: [CmsAnnouncementInfoComponent],
  entryComponents: [],
  schemas: []
})
export class CmsAnnouncementInfoModule {
}
