import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';

import { CmsAnnouncementDetailRoutingModule } from './cms-announcement-detail-routing.module';
import { CmsAnnouncementDetailComponent } from './cms-announcement-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatCheckboxModule, MatTooltipModule,
    CmsAnnouncementDetailRoutingModule
  ],
  declarations: [CmsAnnouncementDetailComponent],
  exports: [CmsAnnouncementDetailComponent],
  entryComponents: [],
  schemas: []
})
export class CmsAnnouncementDetailModule {
}
